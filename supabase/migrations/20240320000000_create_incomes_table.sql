create table public.incomes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  period_name text not null,
  daily_amount numeric not null check (daily_amount > 0),
  currency text not null,
  dates date[] not null,
  is_paid boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Создаем RLS политики
alter table public.incomes enable row level security;

create policy "Users can view their own incomes"
  on public.incomes for select
  using (auth.uid() = user_id);

create policy "Users can insert their own incomes"
  on public.incomes for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own incomes"
  on public.incomes for update
  using (auth.uid() = user_id);

create policy "Users can delete their own incomes"
  on public.incomes for delete
  using (auth.uid() = user_id); 