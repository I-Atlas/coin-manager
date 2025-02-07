import { ActionIcon, Checkbox, Group, Paper, Stack, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { CURRENCY_SYMBOLS, GRADIENTS } from "../../constants";
import { IncomeEntry } from "../../types";

interface IncomeCardProps {
  entry: IncomeEntry;
  onEdit: (entry: IncomeEntry) => void;
  onDelete: (id: string) => void;
  onTogglePaid: (id: string) => void;
}

export function IncomeCard({
  entry,
  onEdit,
  onDelete,
  onTogglePaid,
}: IncomeCardProps) {
  return (
    <Paper
      shadow="sm"
      p="md"
      radius="md"
      bg={`linear-gradient(${GRADIENTS.paper.deg}deg, ${GRADIENTS.paper.from}, ${GRADIENTS.paper.to})`}
    >
      <Stack gap="xs">
        <Group grow>
          <Group>
            <Checkbox
              checked={entry.isPaid}
              onChange={() => onTogglePaid(entry.id)}
              label="Оплачено"
              size="md"
            />
            <Text fw={600}>{entry.periodName}</Text>
          </Group>
          <Group gap="xs" justify="flex-end">
            <ActionIcon
              onClick={() => onEdit(entry)}
              color="blue"
              variant="light"
              radius="xl"
              size="lg"
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              onClick={() => onDelete(entry.id)}
              color="red"
              variant="light"
              radius="xl"
              size="lg"
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Group>
        <Text size="sm" c="dimmed">
          {entry.dates
            .map((date) => dayjs(date).format("DD.MM.YYYY"))
            .join(", ")}
        </Text>
        <Stack gap={2}>
          <Text fw={600} c={entry.isPaid ? "teal" : "dimmed"}>
            {entry.dailyAmount} {CURRENCY_SYMBOLS[entry.currency]} в день
          </Text>
          <Text size="sm" c="dimmed">
            Всего за период:{" "}
            <Text span fw={600} c={entry.isPaid ? "teal" : "dimmed"}>
              {entry.dailyAmount * entry.dates.length}{" "}
              {CURRENCY_SYMBOLS[entry.currency]}
            </Text>
          </Text>
        </Stack>
      </Stack>
    </Paper>
  );
}
