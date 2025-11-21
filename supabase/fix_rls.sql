-- 1. Fix Categories RLS (Run this part first if you want)
create policy "Users can update their own categories" on categories
  for update using (auth.uid() = user_id);

create policy "Users can delete their own categories" on categories
  for delete using (auth.uid() = user_id);

-- 2. Create Budgets Table (Since it is missing)
create table if not exists budgets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  category_id uuid references categories not null,
  amount numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, category_id)
);

-- 3. Enable RLS for Budgets
alter table budgets enable row level security;

-- 4. Add RLS Policies for Budgets
create policy "Users can view their own budgets" on budgets
  for select using (auth.uid() = user_id);

create policy "Users can insert their own budgets" on budgets
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own budgets" on budgets
  for update using (auth.uid() = user_id);

create policy "Users can delete their own budgets" on budgets
  for delete using (auth.uid() = user_id);
