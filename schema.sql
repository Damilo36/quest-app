-- ============================================================
-- QUEST APP — Supabase Schema
-- Führe dieses Script im Supabase SQL Editor aus
-- ============================================================

-- SESSIONS
create table if not exists sessions (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,
  config        jsonb not null default '{}',
  status        text not null default 'lobby',  -- lobby | active | ended
  created_at    timestamptz default now()
);

-- PARTICIPANTS
create table if not exists participants (
  id            uuid primary key default gen_random_uuid(),
  session_id    uuid references sessions(id) on delete cascade,
  nickname      text not null,
  avatar_color  text default '#C6FF00',
  created_at    timestamptz default now()
);

-- TASKS
create table if not exists tasks (
  id                   uuid primary key default gen_random_uuid(),
  session_id           uuid references sessions(id) on delete cascade,
  emoji                text,
  text                 text,
  type                 text,           -- Foto | Video
  is_golden            boolean default false,
  status               text default 'open',  -- open | active | done
  claimed_by           uuid references participants(id),
  claimed_by_nickname  text,
  photo_url            text,
  sort_order           int default 0,
  completed_at         timestamptz,
  created_at           timestamptz default now()
);

-- ── ROW LEVEL SECURITY ─────────────────────────────────────
alter table sessions    enable row level security;
alter table participants enable row level security;
alter table tasks       enable row level security;

-- Sessions: jeder darf lesen, erstellen, updaten
create policy "sessions_select" on sessions for select using (true);
create policy "sessions_insert" on sessions for insert with check (true);
create policy "sessions_update" on sessions for update using (true);

-- Participants: jeder darf lesen, beitreten
create policy "participants_select" on participants for select using (true);
create policy "participants_insert" on participants for insert with check (true);

-- Tasks: jeder darf lesen, erstellen, updaten
create policy "tasks_select" on tasks for select using (true);
create policy "tasks_insert" on tasks for insert with check (true);
create policy "tasks_update" on tasks for update using (true);

-- ── REALTIME ───────────────────────────────────────────────
alter publication supabase_realtime add table sessions;
alter publication supabase_realtime add table participants;
alter publication supabase_realtime add table tasks;

-- ── STORAGE ────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
  values ('proofs', 'proofs', true)
  on conflict do nothing;

create policy "proofs_upload" on storage.objects
  for insert with check (bucket_id = 'proofs');

create policy "proofs_public" on storage.objects
  for select using (bucket_id = 'proofs');

-- ── FERTIG ─────────────────────────────────────────────────
-- Alles bereit. Kopiere jetzt deine API Keys.
