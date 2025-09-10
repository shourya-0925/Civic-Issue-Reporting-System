-- Users
create table if not exists users (
  id text primary key,
  name text,
  email text unique not null,
  password_hash text not null,
  created_at text not null
);

-- Reports
create table if not exists reports (
  id text primary key,
  user_id text not null,
  title text not null,
  description text,
  category text not null,
  photo_url text,
  latitude real,
  longitude real,
  captured_at text,
  status text not null default 'open',
  created_at text not null,
  foreign key (user_id) references users(id)
);
create index if not exists idx_reports_user on reports(user_id);
create index if not exists idx_reports_category on reports(category);

-- Votes / Confirmations
create table if not exists report_votes (
  report_id text not null,
  voter_id text not null,
  created_at text not null,
  primary key (report_id, voter_id),
  foreign key (report_id) references reports(id),
  foreign key (voter_id) references users(id)
);

-- Comments
create table if not exists comments (
  id integer primary key autoincrement,
  report_id text not null,
  user_id text not null,
  content text not null,
  created_at text not null,
  foreign key (report_id) references reports(id),
  foreign key (user_id) references users(id)
);
create index if not exists idx_comments_report on comments(report_id);

-- Gamification
create table if not exists points_ledger (
  id integer primary key autoincrement,
  user_id text not null,
  source text not null,
  points integer not null,
  meta text,
  created_at text not null,
  foreign key (user_id) references users(id)
);
create index if not exists idx_points_user on points_ledger(user_id);

create table if not exists badges (
  id text primary key,
  name text not null,
  description text,
  rarity text not null,
  icon_name text,
  color text
);

create table if not exists user_badges (
  user_id text not null,
  badge_id text not null,
  earned_at text not null,
  primary key (user_id, badge_id),
  foreign key (user_id) references users(id),
  foreign key (badge_id) references badges(id)
);

create table if not exists activity_log (
  id integer primary key autoincrement,
  user_id text not null,
  happened_on text not null,
  action text not null,
  created_at text not null,
  unique(user_id, happened_on, action),
  foreign key (user_id) references users(id)
);
