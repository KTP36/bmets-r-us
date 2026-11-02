create table if not exists public.quiz_results (
 id text primary key, username text not null, email text not null,
 activity text not null, score integer not null, total integer not null,
 percent integer not null, time_seconds double precision,
 verification text not null default 'client_reported',
 created_at timestamptz not null default now(),
 check(total between 1 and 200 and score between 0 and total),
 check(percent between 0 and 100),check(time_seconds is null or time_seconds > 0)
);
alter table public.quiz_results enable row level security;
revoke all on public.quiz_results from anon, authenticated;
create index if not exists quiz_results_created_idx on public.quiz_results(created_at desc);
