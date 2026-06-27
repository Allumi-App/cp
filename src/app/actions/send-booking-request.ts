'use server'

import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'

// Server-side coaching-request handler (replaces the Supabase edge function).
// Reads Gmail creds + Supabase keys straight from the environment, so it works
// the moment .env is set locally and via host env in production.
//
//   GMAIL_USER, GMAIL_APP_PASSWORD            → required to send email
//   NEXT_PUBLIC_CP_SUPABASE_URL / _ANON_KEY   → read editable email templates
//   SUPABASE_SERVICE_ROLE_KEY                 → OPTIONAL; records the lead in the
//                                               dashboard inbox (admin-only table)

export interface SendBookingRequestPayload {
  packageSlug: string
  packageName: string
  packagePrice: string
  customer: { firstName: string; lastName: string; email: string; phone: string; focus: string }
  lang: 'en' | 'de'
}

/** Replace {{placeholder}} tokens from a flat string map. */
function render(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => vars[key] ?? '')
}

function htmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Plain-text body → HTML paragraphs (blank line = new paragraph, newline = <br>). */
function bodyToHtml(text: string): string {
  return htmlEscape(text)
    .split(/\n{2,}/)
    .map(
      (p) =>
        `<p style="margin:0 0 16px;line-height:1.65;color:#2C1810;font-size:15px;">${p.replace(/\n/g, '<br>')}</p>`,
    )
    .join('')
}

/** Branded email shell — wordmark "logo" + brand colors around the editable body. */
function emailShell(bodyHtml: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#FDF2F0;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#FFFDF9;border:1px solid #2C18101A;border-radius:18px;overflow:hidden;">
      <tr><td style="padding:38px 40px 30px;text-align:center;border-bottom:1px solid #2C18101A;">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:25px;font-weight:700;letter-spacing:-0.01em;"><span style="color:#2C1810;">Christina</span> <span style="color:#C49C40;">Pfeiffer</span></div>
      </td></tr>
      <tr><td style="padding:34px 40px 30px;">${bodyHtml}</td></tr>
      <tr><td style="padding:22px 40px 30px;border-top:1px solid #2C18101A;text-align:center;">
        <div style="font-size:12px;font-weight:500;color:#2C181099;">Christina Pfeiffer · Transformation Coaching</div>
        <div style="padding-top:7px;font-size:11px;line-height:1.5;color:#2C181066;">You received this because you requested a session at christinapfeiffer.com</div>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`
}

interface EmailTemplateRow {
  kind: string
  subject: string | null
  subject_de: string | null
  body: string | null
  body_de: string | null
  to_email: string | null
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
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // anon client for public template reads; service-role client for recording.
  const readDb = supabaseUrl && anonKey ? createClient(supabaseUrl, anonKey) : null
  const writeDb = supabaseUrl && serviceKey ? createClient(supabaseUrl, serviceKey) : null

  // Record the lead in the dashboard inbox (best-effort; needs the service role key).
  if (writeDb) {
    try {
      await writeDb.from('booking_requests').insert({
        package_slug: packageSlug ?? null,
        package_name: packageName ?? null,
        first_name: customer.firstName ?? null,
        last_name: customer.lastName ?? null,
        email: customer.email ?? null,
        phone: customer.phone ?? null,
        focus: customer.focus ?? null,
        lang,
      })
    } catch (e) {
      console.error('[send-booking-request] could not record request:', e)
    }
  } else {
    console.warn('[send-booking-request] SUPABASE_SERVICE_ROLE_KEY not set — request not recorded to the dashboard inbox')
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
    const gmailUser = process.env.GMAIL_USER
    const gmailPass = process.env.GMAIL_APP_PASSWORD
    if (!gmailUser || !gmailPass) throw new Error('MISSING_GMAIL_SECRETS')

    let notify: EmailTemplateRow | undefined
    let confirm: EmailTemplateRow | undefined
    if (readDb) {
      const { data: templates } = await readDb.from('email_templates').select('*')
      notify = templates?.find((t: EmailTemplateRow) => t.kind === 'notify_christina')
      confirm = templates?.find((t: EmailTemplateRow) => t.kind === 'confirm_visitor')
    }
    if (!notify && !confirm) throw new Error('NO_EMAIL_TEMPLATES')

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPass },
    })

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
