import { MantineGradient } from "@mantine/core";

export const CURRENCIES = [
  { value: "RUB", label: "₽ (RUB)" },
  { value: "USD", label: "$ (USD)" },
  { value: "EUR", label: "€ (EUR)" },
];

export const CURRENCY_SYMBOLS: Record<string, string> = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
};

export const GRADIENTS: Record<string, MantineGradient> = {
  header: { from: "#7950f2", to: "#4c6ef5", deg: 45 },
  income: { from: "#12b886", to: "#15aabf", deg: 45 },
  paper: { from: "#e9ecef", to: "#f8f9fa", deg: 45 },
};
