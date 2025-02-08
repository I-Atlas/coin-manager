import { supabase } from "../lib";
import { Expense, ExpenseFormValues } from "../types";

class ExpenseService {
  async getAll(): Promise<Expense[]> {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    return data;
  }

  async create(values: ExpenseFormValues & { date: string }): Promise<Expense> {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const { data, error } = await supabase
      .from("expenses")
      .insert([{ ...values, user_id: userData.user.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(
    id: string,
    values: ExpenseFormValues & { date: string },
  ): Promise<Expense> {
    const { data, error } = await supabase
      .from("expenses")
      .update(values)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) throw error;
  }
}

export const expenseService = new ExpenseService();
