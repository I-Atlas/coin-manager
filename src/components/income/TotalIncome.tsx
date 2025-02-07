import { Group, Paper, Stack, Text } from "@mantine/core";
import { CURRENCY_SYMBOLS, GLASS_EFFECT, GRADIENTS } from "../../constants";

interface TotalIncomeProps {
  totalsByCurrency: Record<string, number>;
}

export function TotalIncome({ totalsByCurrency }: TotalIncomeProps) {
  return (
    <Paper
      shadow="lg"
      p="xl"
      radius="lg"
      style={{
        ...GLASS_EFFECT,
        background: `linear-gradient(${GRADIENTS.income.deg}deg, ${GRADIENTS.income.from}, ${GRADIENTS.income.to})`,
      }}
    >
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
