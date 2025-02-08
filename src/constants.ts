export const CURRENCIES = [
  { value: "RUB", label: "Рубли" },
  { value: "USD", label: "Доллары" },
  { value: "EUR", label: "Евро" },
];

export const CURRENCY_SYMBOLS: Record<string, string> = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
};

export const GLASS_EFFECT = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.2s ease",
};
