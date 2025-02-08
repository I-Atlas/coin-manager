export const CURRENCIES = [
  { value: "RUB", label: "₽ Рубли" },
  { value: "USD", label: "$ Доллары" },
  { value: "EUR", label: "€ Евро" },
];

export const CURRENCY_SYMBOLS: Record<string, string> = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
};

export const GLASS_EFFECT = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.2s ease",
};

export const INPUT_STYLES = {
  input: {
    transition: "all 0.2s ease",
    "&:focus": {
      background: "white",
      transform: "translateY(-2px)",
    },
  },
  label: {
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },
};
