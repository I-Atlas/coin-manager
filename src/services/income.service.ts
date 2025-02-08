import { supabase } from "../lib/supabase";
import { CreateIncomeDTO, Income, UpdateIncomeDTO } from "../types/income";

const TABLE_NAME = "incomes";

export const incomeService = {
  async getAll(): Promise<Income[]> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id: string): Promise<Income | null> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(income: CreateIncomeDTO): Promise<Income> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Пользователь не авторизован");

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([{ ...income, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, income: UpdateIncomeDTO): Promise<Income> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(income)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);

    if (error) throw error;
  },

  async getTotal(): Promise<number> {
    const { data, error } = await supabase.from(TABLE_NAME).select("amount");

    if (error) throw error;
    return data.reduce((sum, income) => sum + Number(income.amount), 0);
  },
};
