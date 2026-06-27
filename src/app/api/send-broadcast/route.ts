import { createClient } from '@supabase/supabase-js'
import { render, bodyToHtml, emailShell, pickLang, getGmail, type EmailTemplateRow } from '@/app/actions/email-lib'

// Dashboard-triggered newsletter broadcast. The admin dashboard is a separate
// app with no server of its own, so it calls this route (cross-origin) with its
// CP Supabase session token. Authorization is enforced by RLS: only an admin's
// token can read the subscribers table, so a non-admin caller reaches no one.
//
// Requires GMAIL_USER / GMAIL_APP_PASSWORD + NEXT_PUBLIC_CP_SUPABASE_URL/_ANON_KEY.

export const runtime = 'nodejs'

const BROADCAST_FOOTER =
  'You received this because you subscribed at christinapfeiffer.com. Reply to unsubscribe.'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, content-type',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...CORS },
  })
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}

interface Subscriber {
  email: string
  lang: string | null
  status: string
}

export async function POST(req: Request) {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!token) return json({ ok: false, error: 'UNAUTHORIZED' }, 401)

  const supabaseUrl = process.env.NEXT_PUBLIC_CP_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_CP_SUPABASE_ANON_KEY
  if (!supabaseUrl || !anonKey) return json({ ok: false, error: 'SUPABASE_UNCONFIGURED' }, 500)

  // Client bound to the caller's session — RLS (is_admin()) gates the data.
  const db = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data: userData } = await db.auth.getUser()
  if (!userData?.user) return json({ ok: false, error: 'UNAUTHORIZED' }, 401)

  // Optional subset of emails (from a multi-select in the dashboard).
  let only: string[] | null = null
  try {
    const body = (await req.json()) as { emails?: string[] } | null
    if (body?.emails?.length) only = body.emails.map((e) => e.trim().toLowerCase())
  } catch {
    /* no body → broadcast to everyone */
  }

  // Subscribers — only an admin token returns rows (RLS).
  const { data: subsData, error: subsErr } = await db
    .from('subscribers')
    .select('email, lang, status')
    .eq('status', 'subscribed')
  if (subsErr) return json({ ok: false, error: subsErr.message }, 403)

  let subscribers = (subsData ?? []) as Subscriber[]
  if (only) subscribers = subscribers.filter((s) => only!.includes(s.email.toLowerCase()))
  if (!subscribers.length) return json({ ok: true, sent: 0, failed: 0, total: 0 })

  // Broadcast template.
  const { data: tplData } = await db
    .from('email_templates')
    .select('*')
    .eq('kind', 'subscriber_broadcast')
  const tpl = tplData?.[0] as EmailTemplateRow | undefined
  if (!tpl) return json({ ok: false, error: 'NO_BROADCAST_TEMPLATE' }, 400)

  let transporter, gmailUser
  try {
    ;({ transporter, gmailUser } = getGmail())
  } catch {
    return json({ ok: false, error: 'MISSING_GMAIL_SECRETS' }, 500)
  }

  let sent = 0
  let failed = 0
  for (const sub of subscribers) {
    const loc = sub.lang === 'de' ? 'de' : 'en'
    const vars = { email: sub.email, lang: loc }
    const text = render(pickLang(loc, tpl.body, tpl.body_de), vars)
    try {
      await transporter.sendMail({
        from: `Christina Pfeiffer <${gmailUser}>`,
        to: sub.email,
        subject: render(pickLang(loc, tpl.subject, tpl.subject_de), vars),
        text,
        html: emailShell(bodyToHtml(text), BROADCAST_FOOTER),
      })
      sent++
    } catch (e) {
      failed++
      console.error('[send-broadcast] failed for', sub.email, e instanceof Error ? e.message : e)
    }
  }

  return json({ ok: true, sent, failed, total: subscribers.length })
}
