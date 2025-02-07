export interface IncomeEntry {
  id: string;
  dates: Date[];
  dailyAmount: number;
  currency: string;
  periodName: string;
  isPaid: boolean;
}

export interface IncomeFormValues {
  dailyAmount: number;
  currency: string;
  periodName: string;
  isPaid: boolean;
}
