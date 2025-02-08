import { Group, Paper, Stack, Text } from "@mantine/core";
import { CURRENCY_SYMBOLS, GLASS_EFFECT } from "../../constants";
import { Income } from "../../types/income";

interface TotalIncomeProps {
  incomes: Income[];
}

export function TotalIncome({ incomes }: TotalIncomeProps) {
  const totalsByCurrency = incomes
    .filter((income) => income.isPaid)
    .reduce((acc, income) => {
      const totalAmount = income.dailyAmount * income.dates.length;
      acc[income.currency] = (acc[income.currency] || 0) + totalAmount;
      return acc;
    }, {} as Record<string, number>);

  return (
    <Paper p="xl" radius="lg" bg="green" style={GLASS_EFFECT}>
      <Stack gap="md">
        <Text size="xl" fw={800} c="white" ta="center">
          Общий доход
        </Text>
        {Object.entries(totalsByCurrency).map(([currency, total]) => (
          <Paper key={currency} p="md" radius="md" style={GLASS_EFFECT}>
            <Group justify="space-between" align="center">
              <Text fw={700} size="lg" c="white">
                {currency}:
              </Text>
              <Text fw={800} size="xl" c="white">
                {total} {CURRENCY_SYMBOLS[currency]}
              </Text>
            </Group>
          </Paper>
        ))}
        {Object.keys(totalsByCurrency).length === 0 && (
          <Text c="white" ta="center">
            Нет оплаченных доходов
          </Text>
        )}
      </Stack>
    </Paper>
  );
}
