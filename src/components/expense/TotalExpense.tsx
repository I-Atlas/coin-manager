import { Group, Paper, Stack, Text } from "@mantine/core";
import { CURRENCY_SYMBOLS, GLASS_EFFECT } from "../../constants";
import { Expense } from "../../types";

interface TotalExpenseProps {
  expenses: Expense[];
}

export function TotalExpense({ expenses }: TotalExpenseProps) {
  const totalsByCurrency = expenses.reduce((acc, expense) => {
    acc[expense.currency] = (acc[expense.currency] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Paper p="lg" radius="xl" bg="red" style={GLASS_EFFECT}>
      <Stack gap="md">
        <Text size="xl" fw={800} c="white">
          Общие расходы
        </Text>
        {Object.entries(totalsByCurrency).map(([currency, total]) => (
          <Group key={currency} justify="space-between" align="center">
            <Text fw={800} size="lg" c="white">
              {currency}:
            </Text>
            <Text fw={800} size="xl" c="white">
              {total} {CURRENCY_SYMBOLS[currency]}
            </Text>
          </Group>
        ))}
        {Object.keys(totalsByCurrency).length === 0 && (
          <Text c="white" ta="center">
            Нет расходов
          </Text>
        )}
      </Stack>
    </Paper>
  );
}
