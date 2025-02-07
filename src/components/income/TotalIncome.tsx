import { Paper, Stack, Text } from "@mantine/core";
import { CURRENCY_SYMBOLS, GRADIENTS } from "../../constants";

interface TotalIncomeProps {
  totalsByCurrency: Record<string, number>;
}

export function TotalIncome({ totalsByCurrency }: TotalIncomeProps) {
  return (
    <Paper
      shadow="sm"
      p="md"
      radius="md"
      bg={`linear-gradient(${GRADIENTS.income.deg}deg, ${GRADIENTS.income.from}, ${GRADIENTS.income.to})`}
    >
      <Stack gap="xs">
        <Text size="lg" fw={700} c="white">
          Общий доход:
        </Text>
        {Object.entries(totalsByCurrency).map(([currency, total]) => (
          <Text key={currency} fw={600} c="white" size="xl">
            {total} {CURRENCY_SYMBOLS[currency]}
          </Text>
        ))}
      </Stack>
    </Paper>
  );
}
