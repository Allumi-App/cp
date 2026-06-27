'use server'

import { createClient } from '@supabase/supabase-js'
import { render, bodyToHtml, emailShell, getGmail, type EmailTemplateRow } from './email-lib'

// Server-side coaching-request handler (replaces the Supabase edge function).
// Reads Gmail creds + Supabase keys straight from the environment, so it works
// the moment .env is set locally and via host env in production.
//
//   GMAIL_USER, GMAIL_APP_PASSWORD            → required to send email
//   NEXT_PUBLIC_CP_SUPABASE_URL / _ANON_KEY   → read templates + record the request
//                                               (via the submit_booking_request RPC)

export interface SendBookingRequestPayload {
  packageSlug: string
  packageName: string
  packagePrice: string
  customer: { firstName: string; lastName: string; email: string; phone: string; focus: string }
  lang: 'en' | 'de'
}

export async function sendBookingRequest(
  payload: SendBookingRequestPayload,
): Promise<{ ok: boolean; emailed: boolean; emailError?: string }> {
  const { packageSlug, packageName, packagePrice, customer } = payload
  const lang = payload.lang === 'de' ? 'de' : 'en'

  if (!customer?.firstName || !customer?.email) {
    return { ok: false, emailed: false, emailError: 'Missing required fields.' }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_CP_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_CP_SUPABASE_ANON_KEY

  // anon client — reads public templates and records the lead via an anon-callable
  // SECURITY DEFINER RPC (no service-role key needed).
  const db = supabaseUrl && anonKey ? createClient(supabaseUrl, anonKey) : null

  // Record the lead in the dashboard inbox (best-effort).
  if (db) {
    const { error: recErr } = await db.rpc('submit_booking_request', {
      p_package_slug: packageSlug ?? null,
      p_package_name: packageName ?? null,
      p_first_name: customer.firstName ?? null,
      p_last_name: customer.lastName ?? null,
      p_email: customer.email ?? null,
      p_phone: customer.phone ?? null,
      p_focus: customer.focus ?? null,
      p_lang: lang,
    })
    if (recErr) console.error('[send-booking-request] could not record request:', recErr.message)
  }

  const vars: Record<string, string> = {
    firstName: customer.firstName ?? '',
    lastName: customer.lastName ?? '',
    email: customer.email ?? '',
    phone: customer.phone ?? '',
    focus: customer.focus ?? '',
    packageName: packageName ?? packageSlug ?? '',
    packagePrice: packagePrice ?? '',
    lang,
  }
  const pick = (en?: string | null, de?: string | null) =>
    lang === 'de' ? de || en || '' : en || ''

  // Best-effort email — never block the visitor's confirmation on delivery.
  let emailed = false
  let emailError = ''
  try {
    let notify: EmailTemplateRow | undefined
    let confirm: EmailTemplateRow | undefined
    if (db) {
      const { data: templates } = await db.from('email_templates').select('*')
      notify = templates?.find((t: EmailTemplateRow) => t.kind === 'notify_christina')
      confirm = templates?.find((t: EmailTemplateRow) => t.kind === 'confirm_visitor')
    }
    if (!notify && !confirm) throw new Error('NO_EMAIL_TEMPLATES')

    const { transporter, gmailUser } = getGmail()

    if (notify) {
      const text = render(pick(notify.body, notify.body_de), vars)
      await transporter.sendMail({
        from: `Christina Pfeiffer Website <${gmailUser}>`,
        to: notify.to_email || gmailUser,
        replyTo: customer.email,
        subject: render(pick(notify.subject, notify.subject_de), vars),
        text,
        html: emailShell(bodyToHtml(text)),
      })
    }

    if (confirm) {
      const text = render(pick(confirm.body, confirm.body_de), vars)
      await transporter.sendMail({
        from: `Christina Pfeiffer <${gmailUser}>`,
        to: customer.email,
        subject: render(pick(confirm.subject, confirm.subject_de), vars),
        text,
        html: emailShell(bodyToHtml(text)),
      })
    }

    emailed = true
  } catch (e) {
    emailError = e instanceof Error ? e.message : String(e)
    console.error('[send-booking-request] email failed:', emailError)
  }

  return { ok: true, emailed, emailError: emailError || undefined }
}
