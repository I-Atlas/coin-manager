export interface Income {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  date: string;
  created_at: string;
}

export type CreateIncomeDTO = Omit<Income, "id" | "user_id" | "created_at">;
export type UpdateIncomeDTO = Partial<CreateIncomeDTO>;
