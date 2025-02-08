import { Group, Paper, Stack, Text } from "@mantine/core";
import { CURRENCY_SYMBOLS, GLASS_EFFECT } from "../../constants";

interface TotalIncomeProps {
  totalsByCurrency: Record<string, number>;
}

export function TotalIncome({ totalsByCurrency }: TotalIncomeProps) {
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
      </Stack>
    </Paper>
  );
}
