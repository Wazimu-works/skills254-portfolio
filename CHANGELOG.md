# Changelog

## 2026-05-24

- Replaced the Vite mockup setup with a Next.js 15 App Router architecture.
- Built a premium futuristic DJ portfolio UI using Tailwind CSS and the existing mockup imagery.
- Added booking, contact, admin, and payment-ready application routes.
- Added secure API route scaffolds for bookings, contact messages, Daraja STK Push, and callbacks.
- Added Supabase helper utilities, input validation, middleware protection, security headers, and rate limiting.
- Added a Supabase SQL schema covering tables, storage buckets, and RLS/storage policies.
- Rewrote the README to document architecture, setup, deployment, security, and payment flow.
- Tightened TypeScript coverage for the Supabase SSR helper and excluded the legacy Vite mockup from the active Next.js build.
- Verified the project with `npm run typecheck` and `npm run build`.
- Split the former single-page portfolio sections into dedicated routes for Home, Sound, Mixtapes, Courses, Packages, and Contact.
- Rebuilt the admin area into a Supabase-authenticated multi-page control center with dashboard, mixtapes, courses, bookings, pricing, payments, content, media, analytics, and customization sections.
- Removed public and admin event surfaces from the site structure.
- Expanded admin customization controls for theme palettes, homepage banners, featured mixtapes, featured courses, and hero media settings.
- Added richer media/admin catalog views for thumbnails, broader audio/video formats, DJ asset collections, detailed course offerings, exact package ladders, and genre-ordered mixtape browsing.
- Extended the payments view with total received, payout placeholder totals, and related client/source names.
