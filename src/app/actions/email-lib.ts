// Shared server-side email helpers used by every CP email path:
//   - send-booking-request.ts  (coaching request → Christina + visitor)
//   - subscribe.ts             (newsletter sign-up → thank-you)
//   - api/send-broadcast        (dashboard → all subscribers)
//
// Plain (non-"use server") module so it can export sync helpers. Only ever
// imported by server actions / route handlers.
import nodemailer from 'nodemailer'

/** Replace {{placeholder}} tokens from a flat string map. */
export function render(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => vars[key] ?? '')
}

function htmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Plain-text body → HTML paragraphs (blank line = new paragraph, newline = <br>). */
export function bodyToHtml(text: string): string {
  return htmlEscape(text)
    .split(/\n{2,}/)
    .map(
      (p) =>
        `<p style="margin:0 0 16px;line-height:1.65;color:#2C1810;font-size:15px;">${p.replace(/\n/g, '<br>')}</p>`,
    )
    .join('')
}

const DEFAULT_FOOTER = 'You received this because you requested a session at christinapfeiffer.com'

/** Branded email shell — wordmark "logo" + brand colors around the editable body. */
export function emailShell(bodyHtml: string, footerNote: string = DEFAULT_FOOTER): string {
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
        <div style="padding-top:7px;font-size:11px;line-height:1.5;color:#2C181066;">${htmlEscape(footerNote)}</div>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`
}

/** Pick EN/DE with EN fallback. */
export function pickLang(lang: 'en' | 'de', en?: string | null, de?: string | null): string {
  return lang === 'de' ? de || en || '' : en || ''
}

export interface EmailTemplateRow {
  kind: string
  subject: string | null
  subject_de: string | null
  body: string | null
  body_de: string | null
  to_email: string | null
}

/**
 * Build the Gmail transporter from env. Throws MISSING_GMAIL_SECRETS when the
 * credentials are absent so callers can treat email as best-effort.
 */
export function getGmail(): { transporter: nodemailer.Transporter; gmailUser: string } {
  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD
  if (!gmailUser || !gmailPass) throw new Error('MISSING_GMAIL_SECRETS')
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailPass },
  })
  return { transporter, gmailUser }
}
