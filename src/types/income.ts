export interface Income {
  id: string;
  user_id: string;
  periodName: string;
  dailyAmount: number;
  currency: string;
  dates: string[];
  isPaid: boolean;
  created_at: string;
}

export type CreateIncomeDTO = Omit<Income, "id" | "user_id" | "created_at">;
export type UpdateIncomeDTO = Partial<CreateIncomeDTO>;

export interface IncomeFormValues {
  periodName: string;
  dailyAmount: number;
  currency: string;
  isPaid: boolean;
}
