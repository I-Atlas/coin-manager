create table public.incomes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  amount numeric not null check (amount > 0),
  description text not null,
  date date not null,
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