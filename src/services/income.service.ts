import { supabase } from "../lib";
import { CreateIncomeDTO, Income, UpdateIncomeDTO } from "../types";

const TABLE_NAME = "incomes";

interface UpdateData {
  period_name?: string;
  daily_amount?: number;
  currency?: string;
  dates?: string[];
  is_paid?: boolean;
}

class IncomeService {
  async getAll(): Promise<Income[]> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data.map((item) => ({
      ...item,
      periodName: item.period_name,
      dailyAmount: item.daily_amount,
      isPaid: item.is_paid,
    }));
  }

  async getById(id: string): Promise<Income | null> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      periodName: data.period_name,
      dailyAmount: data.daily_amount,
      isPaid: data.is_paid,
    };
  }

  async create(income: CreateIncomeDTO): Promise<Income> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Пользователь не авторизован");

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([
        {
          user_id: user.id,
          period_name: income.periodName,
          daily_amount: income.dailyAmount,
          currency: income.currency,
          dates: income.dates,
          is_paid: income.isPaid,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      periodName: data.period_name,
      dailyAmount: data.daily_amount,
      isPaid: data.is_paid,
    };
  }

  async update(id: string, income: UpdateIncomeDTO): Promise<Income> {
    const updateData: UpdateData = {};
    if (income.periodName !== undefined)
      updateData.period_name = income.periodName;
    if (income.dailyAmount !== undefined)
      updateData.daily_amount = income.dailyAmount;
    if (income.currency !== undefined) updateData.currency = income.currency;
    if (income.dates !== undefined) updateData.dates = income.dates;
    if (income.isPaid !== undefined) updateData.is_paid = income.isPaid;

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return {
      ...data,
      periodName: data.period_name,
      dailyAmount: data.daily_amount,
      isPaid: data.is_paid,
    };
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from(TABLE_NAME).delete().eq("id", id);
    if (error) throw error;
  }

  async togglePaid(id: string): Promise<Income> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Доход не найден");

    return this.update(id, { isPaid: !data.is_paid });
  }

  async getTotalsByPaidStatus(): Promise<Record<string, number>> {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("is_paid", true);

    if (error) throw error;

    return data.reduce((acc, income) => {
      const totalAmount = income.daily_amount * income.dates.length;
      acc[income.currency] = (acc[income.currency] || 0) + totalAmount;
      return acc;
    }, {} as Record<string, number>);
  }
}

export const incomeService = new IncomeService();
