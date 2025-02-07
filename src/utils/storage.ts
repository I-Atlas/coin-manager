import dayjs from "dayjs";
import { IncomeEntry } from "../types";

export const STORAGE_KEY = "incomeEntries";

export const saveToLocalStorage = (entries: IncomeEntry[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const loadFromLocalStorage = (): IncomeEntry[] => {
  try {
    const savedEntries = localStorage.getItem(STORAGE_KEY);
    if (!savedEntries) return [];

    return JSON.parse(savedEntries).map((entry: IncomeEntry) => ({
      ...entry,
      dates: entry.dates.map((date: Date) => dayjs(date).toDate()),
    }));
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return [];
  }
};
