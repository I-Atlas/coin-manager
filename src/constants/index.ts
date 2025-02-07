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
  header: { from: "#4158D0", to: "#C850C0", deg: 135 },
  income: { from: "#0093E9", to: "#80D0C7", deg: 160 },
  paper: { from: "#8EC5FC", to: "#E0C3FC", deg: 180 },
  success: { from: "#00B09B", to: "#96C93D", deg: 90 },
  warning: { from: "#FF416C", to: "#FF4B2B", deg: 120 },
  card: { from: "#FFFFFF", to: "#ECE9E6", deg: 135 },
  button: { from: "#4158D0", to: "#C850C0", deg: 45 },
};

export const SHADOWS = {
  card: "0 8px 16px rgba(0, 0, 0, 0.1)",
  button: "0 4px 12px rgba(0, 0, 0, 0.15)",
};

export const GLASS_EFFECT = {
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
};
