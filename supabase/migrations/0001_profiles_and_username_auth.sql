-- Profiles table: holds the username shown to the app and links 1:1 to
-- Supabase's built-in auth.users (which securely stores the hashed password
-- and manages sessions/JWTs for both the credentials and Google flows).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique check (username ~ '^[a-zA-Z0-9_]{3,20}$'),
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth.users row is created,
-- whether that's via email/password signUp({ options: { data: { username } } })
-- or via Google OAuth (which has no username, so one is derived from the email).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'username',
      regexp_replace(split_part(new.email, '@', 1), '[^a-zA-Z0-9_]', '', 'g') || '_' || substr(new.id::text, 1, 6)
    ),
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Lets the signup form show "username taken" before calling auth.signUp().
create or replace function public.is_username_taken(check_username text)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (select 1 from public.profiles where username = check_username);
$$;

grant execute on function public.is_username_taken(text) to anon, authenticated;

-- Lets the login form resolve "username" -> the email Supabase Auth actually
-- needs, without exposing the full users/emails list to anon clients.
create or replace function public.get_email_for_username(lookup_username text)
returns text
language plpgsql
security definer set search_path = public
stable
as $$
declare
  found_email text;
begin
  select u.email into found_email
  from auth.users u
  join public.profiles p on p.id = u.id
  where p.username = lookup_username
  limit 1;
  return found_email;
end;
$$;

grant execute on function public.get_email_for_username(text) to anon, authenticated;
