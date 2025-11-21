-- Reset Database (CAUTION: This will delete all data in these tables)
drop table if exists transactions;
drop table if exists categories;
drop table if exists wallets;

-- Create tables for the Personal Finance App

-- Wallets Table
create table wallets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  type text default 'cash', -- cash, bank, e-wallet
  balance numeric default 0,
  icon text,
  created_at timestamptz default now()
);

-- Categories Table
create table categories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  type text not null check (type in ('income', 'expense')),
  icon text,
  color text,
  created_at timestamptz default now()
);

-- Transactions Table
create table transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  wallet_id uuid references wallets(id),
  category_id uuid references categories(id),
  amount numeric not null,
  date timestamptz default now(),
  note text,
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table wallets enable row level security;
alter table categories enable row level security;
alter table transactions enable row level security;

-- Create Policies
create policy "Users can view their own wallets" on wallets
  for select using (auth.uid() = user_id);

create policy "Users can insert their own wallets" on wallets
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own wallets" on wallets
  for update using (auth.uid() = user_id);

create policy "Users can view their own categories" on categories
  for select using (auth.uid() = user_id);

create policy "Users can insert their own categories" on categories
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own categories" on categories
  for update using (auth.uid() = user_id);

create policy "Users can delete their own categories" on categories
  for delete using (auth.uid() = user_id);

create policy "Users can view their own transactions" on transactions
  for select using (auth.uid() = user_id);

create policy "Users can insert their own transactions" on transactions
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own transactions" on transactions
  for update using (auth.uid() = user_id);

create policy "Users can delete their own transactions" on transactions
  for delete using (auth.uid() = user_id);

-- Insert some default categories (optional, can be run manually)
-- insert into categories (user_id, name, type, icon, color) values 
-- (auth.uid(), 'Makanan', 'expense', '🍔', 'red'),
-- (auth.uid(), 'Transport', 'expense', '🚗', 'blue'),
-- (auth.uid(), 'Gaji', 'income', '💰', 'green');
