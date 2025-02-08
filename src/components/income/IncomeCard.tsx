import { ActionIcon, Checkbox, Group, Paper, Stack, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { CURRENCY_SYMBOLS, GLASS_EFFECT } from "../../constants";
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
      p="md"
      radius="lg"
      style={{
        ...GLASS_EFFECT,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      }}
    >
      <Stack gap="xs">
        <Group grow>
          <Group>
            <Checkbox
              checked={entry.isPaid}
              onChange={() => onTogglePaid(entry.id)}
              label={
                <Text fw={400} c={entry.isPaid ? "green" : "red"}>
                  {entry.isPaid ? "Оплачено" : "Не оплачено"}
                </Text>
              }
              size="md"
            />
            <Text fw={400} size="lg" c="white">
              {entry.periodName}
            </Text>
          </Group>
          <Group gap="xs" justify="flex-end">
            <ActionIcon onClick={() => onEdit(entry)} radius="xl" size="lg">
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              onClick={() => onDelete(entry.id)}
              color="red"
              radius="xl"
              size="lg"
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Group>
        <Text size="sm" c="white" fw={400}>
          {entry.dates
            .map((date) => dayjs(date).format("DD.MM.YYYY"))
            .join(", ")}
        </Text>
        <Stack gap={2}>
          <Text fw={700} c={entry.isPaid ? "green" : "red"}>
            {entry.dailyAmount} {CURRENCY_SYMBOLS[entry.currency]} в день
          </Text>
          <Group justify="space-between" align="center">
            <Text size="sm" fw={400} c="white">
              Всего за период:
            </Text>
            <Text fw={700} c={entry.isPaid ? "green" : "red"}>
              {entry.dailyAmount * entry.dates.length}{" "}
              {CURRENCY_SYMBOLS[entry.currency]}
            </Text>
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
}
