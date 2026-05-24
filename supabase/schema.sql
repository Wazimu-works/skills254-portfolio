create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  stage_name text not null default 'Deejay Skills 254',
  bio text,
  avatar_url text,
  instagram_url text,
  youtube_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.mixtapes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  genre text,
  duration_text text,
  youtube_url text,
  cover_image_path text,
  audio_file_path text,
  is_premium boolean not null default false,
  price_kes integer,
  published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  summary text,
  level text,
  duration_text text,
  price_kes integer not null,
  cover_image_path text,
  course_file_path text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.pricing_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  base_price_kes integer not null,
  deposit_kes integer not null,
  duration_text text,
  features jsonb not null default '[]'::jsonb,
  is_featured boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  event_type text not null,
  event_date text not null,
  location text not null,
  guest_count integer not null check (guest_count > 0),
  package_name text not null,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id) on delete set null,
  course_id uuid references public.courses(id) on delete set null,
  mixtape_id uuid references public.mixtapes(id) on delete set null,
  payment_type text not null check (payment_type in ('course', 'booking', 'mixtape')),
  amount integer not null,
  paid_amount integer,
  phone text,
  description text,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'cancelled')),
  receipt_number text,
  merchant_request_id text,
  checkout_request_id text,
  provider_response jsonb,
  callback_payload jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles enable row level security;
alter table public.mixtapes enable row level security;
alter table public.courses enable row level security;
alter table public.pricing_packages enable row level security;
alter table public.bookings enable row level security;
alter table public.payments enable row level security;
alter table public.contact_messages enable row level security;

create policy "Public can read profiles"
on public.profiles for select
using (true);

create policy "Public can read published mixtapes"
on public.mixtapes for select
using (published = true);

create policy "Public can read active courses"
on public.courses for select
using (is_active = true);

create policy "Public can read pricing packages"
on public.pricing_packages for select
using (true);

create policy "Public can create bookings"
on public.bookings for insert
with check (true);

create policy "Public can create contact messages"
on public.contact_messages for insert
with check (true);

create policy "Admins manage profiles"
on public.profiles for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "Admins manage mixtapes"
on public.mixtapes for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "Admins manage courses"
on public.courses for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "Admins manage pricing packages"
on public.pricing_packages for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "Admins manage bookings"
on public.bookings for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "Admins manage payments"
on public.payments for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "Admins manage contact messages"
on public.contact_messages for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

insert into storage.buckets (id, name, public)
values
  ('dj-images', 'dj-images', true),
  ('audio-mixtapes', 'audio-mixtapes', false),
  ('video-mixtapes', 'video-mixtapes', false),
  ('course-files', 'course-files', false)
on conflict (id) do nothing;

create policy "Public can read dj images"
on storage.objects for select
using (bucket_id = 'dj-images');

create policy "Admins manage dj images"
on storage.objects for all
using (bucket_id = 'dj-images' and auth.role() = 'service_role')
with check (bucket_id = 'dj-images' and auth.role() = 'service_role');

create policy "Admins manage audio mixtapes"
on storage.objects for all
using (bucket_id = 'audio-mixtapes' and auth.role() = 'service_role')
with check (bucket_id = 'audio-mixtapes' and auth.role() = 'service_role');

create policy "Admins manage video mixtapes"
on storage.objects for all
using (bucket_id = 'video-mixtapes' and auth.role() = 'service_role')
with check (bucket_id = 'video-mixtapes' and auth.role() = 'service_role');

create policy "Admins manage course files"
on storage.objects for all
using (bucket_id = 'course-files' and auth.role() = 'service_role')
with check (bucket_id = 'course-files' and auth.role() = 'service_role');
