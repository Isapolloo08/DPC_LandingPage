# Planned visits

The Sunday guide remains available without registration. Visitors may optionally send a plan with their name, email or phone, and consent to contact about the visit.

## Local development

- `npm run dev:all` starts this landing page and the sibling `DPC-ManagementSystem/server` on port 5000. `.env.development` sends development requests through Vite's `/api` proxy to that backend, overriding the hosted URL in `.env`.
- Override `VITE_API_BASE_URL` in `.env.development.local` with a full API base URL ending in `/api` if necessary. Restart Vite after changing environment files. Production retains its existing configured URL or Render default; set the deployment override if the management backend is hosted elsewhere.
- Start the management client from `../DPC-ManagementSystem/client` with `npm run dev`. Configure its server URL to `http://localhost:5000` when using the combined development runner; its standalone server default is port 4000.
- The backend's existing schema initialization applies migration `014_planned_visits.sql`. Deploy the backend migration/routes before the landing-page form. No production database changes or deployment are performed as part of local implementation.

## Staff workflow

Admin and Pastor accounts (including the system's legacy IT Admin compatibility) can open Planned visits, filter by status/date, view private contact information, and update notes/status. Updates and their audit record commit in one transaction. Mark Visited only after confirming arrival; submissions never create member or attendance records.

## API

- Public `POST /api/planned-visits`: `submission_token` (UUID), `visit_date` (`YYYY-MM-DD`, today or future Sunday in Asia/Manila), `party`, `bringing_children`, `child_age_groups`, `full_name`, optional `email`, `phone`, `questions`, `consent: true`, and empty honeypot `website`. Name and at least one contact method are required. Name max 120, email 254, phone 30, questions 2000 characters.
- Response `201`: receipt identifier and message only. Same token/details returns the same receipt; a token reused for different details returns `409`. No public record lookup.
- Staff `GET /api/planned-visits?page=1&limit=20&status=New&visit_date=YYYY-MM-DD`: summaries, total, page, totalPages. Limit max 100.
- Staff `GET /api/planned-visits/:id`: complete visitor details, excluding submission token/hash.
- Staff `PATCH /api/planned-visits/:id`: `status` (New, Contacted, Visited, Cancelled) and `staff_notes` (max 4000 characters).
- Validation errors use `400` with `error` and field errors where applicable; public submissions are limited to five per fifteen minutes per IP (`429`). Saving failures return `503`; the form retains details and its retry token. No fallback pretends to save.

## Verification

Run `npm run test:planned-visits` in the sibling server. Tests use a disposable schema in a local PostgreSQL instance (`127.0.0.1:5432`, database `chms_db`, development user/password); they never initialize or modify existing application tables. Persistence integration is explicitly skipped if this local connection is unavailable. Coverage includes validation, concurrent duplicate submissions, auth/roles, staff filters, consent storage, audit rollback, outage retry, and rate limiting.

Email/SMS notifications, visitor accounts, GPS storage, member conversion, and public cancellation links are outside this first version.
