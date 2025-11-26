-- SQL migration: create profiles table and example RLS policies

-- Create the profiles table. `id` references auth.users.id
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  email text,
  role text,
  created_at timestamptz default now()
);

-- Example: enable row level security and allow users to upsert their own profile
-- Note: Execute the following in your Supabase SQL editor as an administrator.

-- Enable RLS
-- alter table public.profiles enable row level security;

-- Allow authenticated users to insert/update their own profile
-- create policy "profiles_upsert_own" on public.profiles
--   for insert, update
--   using (auth.uid() = id)
--   with check (auth.uid() = id);

-- Allow anyone to select basic profile info if needed (or restrict as necessary)
-- create policy "profiles_select_public" on public.profiles
--   for select
--   using (true);

-- For server-side operations or admin scripts, you can use a service role key.

-- After creating the table, be sure to update your RLS policies to your security model.
