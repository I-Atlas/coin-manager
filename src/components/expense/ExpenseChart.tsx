import { Group, Paper, RingProgress, Stack, Text } from "@mantine/core";
import { GLASS_EFFECT } from "../../constants";
import { Expense } from "../../types";

const CATEGORY_COLORS: Record<string, string> = {
  groceries: "#4DABF7",
  transport: "#FAB005",
  entertainment: "#E599F7",
  health: "#FF6B6B",
  utilities: "#15AABF",
  clothing: "#F783AC",
  other: "#868E96",
};

const CATEGORY_LABELS: Record<string, string> = {
  groceries: "Продукты",
  transport: "Транспорт",
  entertainment: "Развлечения",
  health: "Здоровье",
  utilities: "Коммунальные услуги",
  clothing: "Одежда",
  other: "Другое",
};

interface ExpenseChartProps {
  expenses: Expense[];
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  const totalsByCategoryAndCurrency = expenses.reduce((acc, expense) => {
    if (!acc[expense.currency]) {
      acc[expense.currency] = {};
    }
    acc[expense.currency][expense.category] =
      (acc[expense.currency][expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, Record<string, number>>);

  return (
    <Stack gap="lg">
      {Object.entries(totalsByCategoryAndCurrency).map(
        ([currency, categories]) => {
          const total = Object.values(categories).reduce(
            (sum, amount) => sum + amount,
            0,
          );
          const sections = Object.entries(categories).map(
            ([category, amount]) => ({
              value: (amount / total) * 100,
              color: CATEGORY_COLORS[category],
              tooltip: `${CATEGORY_LABELS[category]}: ${amount} ${currency}`,
            }),
          );

          return (
            <Paper key={currency} p="lg" radius="xl" style={GLASS_EFFECT}>
              <Stack gap="md">
                <Text size="xl" fw={800} c="white">
                  Расходы по категориям ({currency})
                </Text>
                <Group align="flex-start" wrap="wrap" justify="center" gap="xl">
                  <RingProgress
                    size={250}
                    thickness={30}
                    label={
                      <Text ta="center" size="xl" fw={700}>
                        {total}
                        <Text size="sm" fw={400}>
                          {currency}
                        </Text>
                      </Text>
                    }
                    sections={sections}
                    roundCaps
                  />
                  <Stack gap="xs">
                    {Object.entries(categories)
                      .sort(([, a], [, b]) => b - a)
                      .map(([category, amount]) => (
                        <Group key={category} gap="xs">
                          <Paper
                            w={12}
                            h={12}
                            style={{
                              backgroundColor: CATEGORY_COLORS[category],
                              borderRadius: "50%",
                            }}
                          />
                          <Text size="sm" c="white">
                            {CATEGORY_LABELS[category]}:{" "}
                            {((amount / total) * 100).toFixed(1)}%
                          </Text>
                        </Group>
                      ))}
                  </Stack>
                </Group>
              </Stack>
            </Paper>
          );
        },
      )}
    </Stack>
  );
}
