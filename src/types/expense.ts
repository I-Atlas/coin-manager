export interface Expense {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface ExpenseFormValues {
  amount: number;
  currency: string;
  category: string;
  description: string;
}
