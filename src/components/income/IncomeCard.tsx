import { ActionIcon, Checkbox, Group, Paper, Stack, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import {
  CURRENCY_SYMBOLS,
  GLASS_EFFECT,
  GRADIENTS,
  SHADOWS,
} from "../../constants";
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
      shadow="lg"
      p="md"
      radius="lg"
      style={{
        ...GLASS_EFFECT,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: SHADOWS.card,
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
                <Text
                  fw={600}
                  variant="gradient"
                  gradient={
                    entry.isPaid ? GRADIENTS.success : GRADIENTS.warning
                  }
                >
                  {entry.isPaid ? "Оплачено" : "Не оплачено"}
                </Text>
              }
              size="md"
            />
            <Text
              fw={700}
              size="lg"
              variant="gradient"
              gradient={GRADIENTS.header}
            >
              {entry.periodName}
            </Text>
          </Group>
          <Group gap="xs" justify="flex-end">
            <ActionIcon
              onClick={() => onEdit(entry)}
              variant="gradient"
              gradient={GRADIENTS.button}
              radius="xl"
              size="lg"
              style={{ boxShadow: SHADOWS.button }}
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              onClick={() => onDelete(entry.id)}
              variant="gradient"
              gradient={GRADIENTS.warning}
              radius="xl"
              size="lg"
              style={{ boxShadow: SHADOWS.button }}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Group>
        <Text size="sm" c="dimmed" fw={500}>
          {entry.dates
            .map((date) => dayjs(date).format("DD.MM.YYYY"))
            .join(", ")}
        </Text>
        <Stack gap={2}>
          <Text
            fw={700}
            variant="gradient"
            gradient={entry.isPaid ? GRADIENTS.success : GRADIENTS.warning}
            size="lg"
          >
            {entry.dailyAmount} {CURRENCY_SYMBOLS[entry.currency]} в день
          </Text>
          <Group justify="space-between" align="center">
            <Text size="sm" fw={500} c="dimmed">
              Всего за период:
            </Text>
            <Text
              fw={700}
              size="lg"
              variant="gradient"
              gradient={entry.isPaid ? GRADIENTS.success : GRADIENTS.warning}
            >
              {entry.dailyAmount * entry.dates.length}{" "}
              {CURRENCY_SYMBOLS[entry.currency]}
            </Text>
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
}
