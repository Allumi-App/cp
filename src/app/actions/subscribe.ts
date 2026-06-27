'use server'

import { createClient } from '@supabase/supabase-js'
import { render, bodyToHtml, emailShell, pickLang, getGmail, type EmailTemplateRow } from './email-lib'

// Newsletter sign-up handler for the website Final CTA. Records the subscriber
// (anon-callable SECURITY DEFINER RPC, no service-role key) and sends a branded
// thank-you email best-effort, reusing the same Gmail setup as the booking flow.

const SUBSCRIBE_FOOTER =
  'You received this because you subscribed at christinapfeiffer.com'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribe(
  email: string,
  lang: 'en' | 'de' = 'en',
): Promise<{ ok: boolean; emailed: boolean; error?: string }> {
  const clean = (email ?? '').trim().toLowerCase()
  const loc = lang === 'de' ? 'de' : 'en'

  if (!EMAIL_RE.test(clean)) {
    return { ok: false, emailed: false, error: 'INVALID_EMAIL' }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_CP_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_CP_SUPABASE_ANON_KEY
  const db = supabaseUrl && anonKey ? createClient(supabaseUrl, anonKey) : null

  // Record the subscriber (best-effort — failing this shouldn't break sign-up UX).
  if (db) {
    const { error } = await db.rpc('submit_subscriber', { p_email: clean, p_lang: loc })
    if (error) console.error('[subscribe] could not record subscriber:', error.message)
  }

  // Best-effort thank-you email.
  let emailed = false
  try {
    let tpl: EmailTemplateRow | undefined
    if (db) {
      const { data } = await db.from('email_templates').select('*').eq('kind', 'subscribe_thankyou')
      tpl = data?.[0]
    }
    if (tpl) {
      const { transporter, gmailUser } = getGmail()
      const vars = { email: clean, lang: loc }
      const text = render(pickLang(loc, tpl.body, tpl.body_de), vars)
      await transporter.sendMail({
        from: `Christina Pfeiffer <${gmailUser}>`,
        to: clean,
        subject: render(pickLang(loc, tpl.subject, tpl.subject_de), vars),
        text,
        html: emailShell(bodyToHtml(text), SUBSCRIBE_FOOTER),
      })
      emailed = true
    }
  } catch (e) {
    console.error('[subscribe] email failed:', e instanceof Error ? e.message : String(e))
  }

  return { ok: true, emailed }
}
