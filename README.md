# Deejay Skills 254 Portfolio

Premium Next.js App Router portfolio for a professional DJ. The site is designed around a futuristic nightclub aesthetic with turquoise, indigo, and controlled hot-pink accents, then structured to support Supabase content storage, secure Daraja STK Push payments, and Vercel deployment.

## Stack

- Next.js 15 App Router
- Tailwind CSS
- Supabase database and storage
- Secure Next.js API routes
- M-Pesa Daraja STK Push integration scaffold
- Vercel-ready deployment setup

## Experience Goals

- Fast first load with server-rendered sections and optimized images
- Calm premium cyber-club visual direction instead of noisy “gaming” UI
- Clean booking and contact conversion flows
- Future-ready paths for paid courses, paid mixtapes, and booking deposits
- Admin-only operational dashboard protected with HTTP basic auth

## Main Routes

- `/` portfolio landing page
- `/booking` direct booking landing page
- `/admin` protected metrics dashboard
- `/api/bookings` validated booking submission
- `/api/contact` validated contact submission
- `/api/payments/stk-push` secure Daraja initiation endpoint
- `/api/payments/callback` secure Daraja callback endpoint

## Project Structure

```text
app/
  api/
  admin/
  booking/
components/
  sections/
  ui/
content/
lib/
  supabase/
public/images/
supabase/schema.sql
CHANGELOG.md
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment values from `.env.example` into `.env.local`.

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

### Public

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Server-only

- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`
- `MPESA_ENV`
- `MPESA_SHORTCODE`
- `MPESA_PASSKEY`
- `MPESA_CONSUMER_KEY`
- `MPESA_CONSUMER_SECRET`
- `MPESA_CALLBACK_URL`
- `ADMIN_BASIC_AUTH_USER`
- `ADMIN_BASIC_AUTH_PASSWORD`

## Supabase

The schema is in [supabase/schema.sql](/C:/Users/HP/OneDrive/Desktop/DEEJAY%20SKILLS%20254/supabase/schema.sql). It includes:

- Tables:
  `profiles`, `mixtapes`, `courses`, `pricing_packages`, `bookings`, `payments`, `contact_messages`
- Storage buckets:
  `dj-images`, `audio-mixtapes`, `video-mixtapes`, `course-files`
- RLS enabled across public tables
- Storage policies for public images and admin-only private media management

### Expected Usage Pattern

- Public content reads use the anonymous key with RLS-safe policies.
- Insert-heavy user actions can go through API routes for additional validation and rate limiting.
- Admin writes use the service role only on the server.
- Premium audio/video/course assets should be delivered with signed URLs, not public links.

## Daraja STK Push Flow

1. User chooses a course, booking deposit, or premium mixtape.
2. Frontend collects phone number and amount.
3. `POST /api/payments/stk-push` validates input and creates a pending payment record.
4. The server calls Daraja using server-only credentials.
5. Daraja calls `POST /api/payments/callback`.
6. The callback updates payment status in Supabase.
7. Business logic can then confirm booking or unlock content.

If Daraja credentials are missing, the STK route returns a mock-safe success payload so the UI can still be tested.

## Security Notes

- No service role keys or Daraja secrets are exposed client-side.
- `/admin` is protected by middleware-based HTTP basic auth.
- Form and payment routes have request validation and simple rate limiting.
- Global security headers are defined in `next.config.ts`.
- Heavy private media is intended for Supabase signed URL delivery.

## Performance Notes

- App Router server rendering by default
- Static-friendly content sections
- `next/image` for local and remote imagery
- Heavy video playback deferred to outbound YouTube opens instead of inline embeds
- Asset layout designed for Vercel CDN caching

## Deployment on Vercel

1. Push the repo to GitHub.
2. Import the repo into Vercel.
3. Add all environment variables from `.env.example`.
4. Set `MPESA_CALLBACK_URL` to your deployed callback route:

```text
https://your-domain.com/api/payments/callback
```

5. Deploy.

## Backend Expansion Ideas

- Replace the in-memory rate limiter with Upstash Redis for multi-instance durability.
- Add Supabase Auth for internal admin identity beyond basic auth.
- Add signed URL issuance for premium mixtapes and student files.
- Add webhook signature verification if Safaricom callback verification requirements evolve.
