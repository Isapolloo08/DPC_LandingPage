# Planned visits

The Sunday guide remains available without registration. Visitors may optionally send a plan with their name, email or phone, and consent to contact about the visit.

## Local development

- `npm run dev:all` starts this landing page and the sibling `DPC-ManagementSystem/server` on port 5000. `.env.development` sends development requests through Vite's `/api` proxy to that backend, overriding the hosted URL in `.env`.
- Override `VITE_API_BASE_URL` in `.env.development.local` with a full API base URL ending in `/api` if necessary. Restart Vite after changing environment files. Production retains its existing configured URL or Render default; set the deployment override if the management backend is hosted elsewhere.
- Start the management client from `../DPC-ManagementSystem/client` with `npm run dev`. Configure its server URL to `http://localhost:5000` when using the combined development runner; its standalone server default is port 4000.
- The backend's existing schema initialization applies migration `014_planned_visits.sql`. Deploy the backend migration/routes before the landing-page form. No production database changes or deployment are performed as part of local implementation.

## Staff workflow

Admin and Pastor accounts (including the system's legacy IT Admin compatibility) can open Planned visits, filter by status/date, view private contact information, and update notes/status. Updates and their audit record commit in one transaction. Mark Visited only after confirming arrival; submissions never create member or attendance records.

## Hosted backend recovery

The deployed management backend is `https://dpc-managementsystem.onrender.com/api`. Set `VITE_API_BASE_URL` to this URL in the Vercel project's Production environment and redeploy the landing page: Vite embeds this value at build time. The source default, local production `.env`, and `.env.example` use this host. Local development continues to use the `/api` proxy.

Following deployment on 2026-10-08, read-only checks against this backend returned 200 with `database: connected` for `/api/health`, 401 for anonymous `/api/planned-visits`, and 200 for ministries, events, and announcements. Cross-origin requests from the Vercel landing page are allowed. No live visitor submission was made during these checks.

The previous `dpc-landingpage.onrender.com` backend had the failures below. The former example host, `dpc-chms-server.onrender.com`, returned 404. Neither host is the newly deployed backend.

On 2026-10-08, read-only checks confirmed two independent deployment failures:

- `GET /api/planned-visits` returned Express's `Cannot GET` 404. The local management server registers this route; an anonymous request to the deployed version should return 401. Deploy the management project's existing planned-visits changes, including `server/src/routes/plannedVisits.ts`, `server/src/services/plannedVisits.ts`, the route registration, schema initialization, and `014_planned_visits.sql`. Ensure the migration is included in the deployment source; it is currently an untracked local file. The server build copies migrations to `dist/db/migrations`.
- `GET /api/health` returned 503 with `database: disconnected` and `connect ENETUNREACH` to an IPv6 address on port 5432. Ministries, events, and announcements returned the same connection error. Fix the Render service's `DATABASE_URL` before redeploying. For Supabase, copy the project's **Session pooler** URI (port 5432) from the Connect dialog, using its exact host and `postgres.<project-ref>` username. Replace the password placeholder with the URL-encoded database password. Session pooling supports IPv4; forcing IPv4 against an IPv6-only direct endpoint does not fix it. See [Supabase connection documentation](https://supabase.com/docs/guides/database/connecting-to-postgres). Keep this URI in Render's environment settings, never in the landing page or committed files.

After recovery, verify `/api/health` returns 200 with `database: connected`, anonymous `/api/planned-visits` returns 401, and the three public content endpoints return 200. Confirm backend startup logs show successful schema initialization and migration 014 before testing an authorized visit submission. A 401 only proves the route exists; it does not prove that its table is ready.

The form keeps details and the retry token when the backend is unavailable, explains that the visit has not been confirmed, and leaves the Sunday guide and directions available. Frontend changes alone cannot restore the hosted database or deploy the missing route.

## API

- Public `POST /api/planned-visits`: `submission_token` (UUID), `visit_date` (`YYYY-MM-DD`, today or future Sunday in Asia/Manila), `party`, `bringing_children`, `child_age_groups`, `full_name`, optional `email`, `phone`, `questions`, `consent: true`, and empty honeypot `website`. Name and at least one contact method are required. Name max 120, email 254, phone 30, questions 2000 characters.
- Response `201`: `receipt_id`, `message`, `confirmation_email` (`queued`, `sent`, `failed`, or `not_requested` for phone-only), and `follow_up` (`date` and `message`). Same token/details returns the same receipt and does not queue another email; a token reused for different details returns `409`. No public visitor-details lookup.
- Public `POST /api/planned-visits/confirmation-status`: requires both the original secret `submission_token` and `receipt_id`, returns only `confirmation_email`, and disables response caching. Rate-limited separately to 60 checks per 15 minutes per IP. The form checks every two seconds for up to 30 seconds and updates its email status without consuming visit-submission limits.
- Staff `GET /api/planned-visits?page=1&limit=20&status=New&visit_date=YYYY-MM-DD`: summaries, total, page, totalPages. Limit max 100.
- Staff `GET /api/planned-visits/:id`: complete visitor details, excluding submission token/hash.
- Staff `PATCH /api/planned-visits/:id`: `status` (New, Contacted, Visited, Cancelled) and `staff_notes` (max 4000 characters).
- Validation errors use `400` with `error` and field errors where applicable; public submissions are limited to five per fifteen minutes per IP (`429`). Saving failures return `503`; the form retains details and its retry token. No fallback pretends to save.

## Verification

Run `npm run test:planned-visits` in the sibling server. Tests use a disposable schema in a local PostgreSQL instance (`127.0.0.1:5432`, database `chms_db`, development user/password); they never initialize or modify existing application tables. Persistence integration is explicitly skipped if this local connection is unavailable. Coverage includes validation, concurrent duplicate submissions, auth/roles, staff filters, consent storage, audit rollback, outage retry, and rate limiting.

## Confirmation email and follow-up

Email submissions queue a confirmation automatically when the plan is saved. The existing `notification_log` and `email_outbox` tables from migration 007 supply durable delivery and deduplication; the visit and email queue commit in one transaction. The route starts delivery immediately after commit, without waiting for the email provider before returning a receipt. The worker also checks every two seconds as a fallback. SMTP connections are pooled and up to two emails send concurrently. A PostgreSQL advisory lock prevents the desktop and landing-page backend processes from processing the same queue simultaneously. Phone-only submissions save normally without sending email or SMS.

Migration `016_email_retry_schedule.sql` adds the retry schedule. Failures retry after 15 seconds, then one minute, five minutes, and fifteen minutes (five attempts total). Missing provider configuration does not consume attempts and is checked again after one minute. Fresh emails are prioritized over due retries. Acceptance by the email provider is recorded as `sent`; this does not guarantee arrival in the inbox rather than Spam.

Worker/database failures have a separate process-level backoff: 15 seconds, 30 seconds, one minute, then two minutes maximum. Successful queue processing restores normal two-second polling. Database connection failures do not consume message delivery attempts. `ENETUNREACH` on an IPv6 address at port 5432 means the worker cannot reach PostgreSQL, before it tries SMTP. For a Supabase database on an IPv4-only host, use the exact Session pooler URI from Supabase Connect (port 5432 and pooled username), not the direct IPv6 URI or the transaction pooler; the worker uses a session advisory lock.

The selected email provider is currently Gmail SMTP with Nodemailer (`EMAIL_PROVIDER=smtp`). Local `.env` no longer contains the unused Resend credentials. Set the same provider explicitly in production if Resend variables were previously added. Gmail SMTP requires a host that permits outbound SMTP; fixing database access does not remove Render Free's SMTP port restriction.

The email and on-screen confirmation include the selected Sunday, worship time (10:00–11:30 AM Philippine time), suggested arrival (9:30 AM), and the expected Saturday follow-up date before that visit. Saturday is described as the welcome team's usual schedule, not a guaranteed appointment. Sunday submissions say the team will get in touch as soon as possible, avoiding a date in the past. Retry responses calculate the expectation from the original submission time. Saturday follow-up is performed by church staff; this feature does not schedule another automatic email for Saturday.

Deploy both the management backend changes and the landing-page changes to enable this in production. Configure the existing management system's Notification email settings (SMTP host, port/security, username/password, sender address), or its `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM_EMAIL` environment overrides. Credentials belong only on the backend. Saving a plan queues the message; it does not prove SMTP delivery. The UI reports queued/sent/delayed status and shows visit details even when email is delayed. A landing page served against an older backend displays that email confirmation is unavailable.

### Render Free: HTTPS delivery

[Render Free blocks outbound SMTP ports 25, 465, and 587](https://render.com/docs/free#other-limitations). Gmail SMTP can therefore work on the local computer but time out on the hosted backend. Use the implemented HTTPS transport on Render Free:

1. Create a Resend account and [verify a sending domain](https://resend.com/docs/dashboard/domains/introduction) with its required DNS records.
2. Add `EMAIL_PROVIDER=resend`, `RESEND_API_KEY` (a sending API key), and `RESEND_FROM_EMAIL` (a mailbox address on the verified domain) to Render's backend environment. The display name continues to use the existing email settings. Resend's default testing domain is limited to the account owner's address; it is not suitable for confirmations to arbitrary visitors.
3. Deploy the management backend changes, including migration 016, and deploy the landing-page status update. To use HTTPS in local development too, set these same variables in `DPC-ManagementSystem/server/.env` and restart the backend.

The HTTPS transport uses [Resend's Send Email API](https://resend.com/docs/api-reference/emails/send-email), a 15-second timeout, and a stable idempotency key for retries. It requires no SMTP connection. Without these credentials, no real Resend delivery can be tested or enabled. SMTP remains the default locally when no HTTPS provider is configured.

Run `npm run test:email` and `npm run test:planned-visits` in the sibling server. Email tests mock external providers and verify real queue persistence, retry timing, worker locking, and delivery status in a disposable local PostgreSQL schema; no real recipients are contacted.

Each confirmation email includes a prominent button and a copyable personal link (`https://daetpresbyterianchurch.vercel.app/#/visit/<management_token>`) to confirm, cancel, or reschedule that recipient's visit. The token comes from the saved visit; never reuse one visitor's link for another recipient. The backend's `PUBLIC_VISIT_WEBSITE_URL` can override the website origin. The existing confirmation page handles these actions. Previously sent emails are not changed by template updates; deploy the backend to apply this template to newly queued messages.

SMS notifications, visitor accounts, GPS storage, and member conversion remain outside this version.
