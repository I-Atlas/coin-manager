import { ActionIcon, Badge, Group, Paper, Stack, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { CURRENCY_SYMBOLS, GLASS_EFFECT } from "../../constants";
import { Income } from "../../types/income";
import { formatDate } from "../../utils/date";

interface IncomeCardProps {
  entry: Income;
  onEdit: (entry: Income) => void;
  onDelete: (id: string) => void;
  onTogglePaid: (id: string) => void;
  isDeleting: boolean;
  isTogglingPaid: boolean;
}

export function IncomeCard({
  entry,
  onEdit,
  onDelete,
  onTogglePaid,
  isDeleting,
  isTogglingPaid,
}: IncomeCardProps) {
  const totalAmount = entry.dailyAmount * entry.dates.length;

  return (
    <Paper
      p="lg"
      radius="lg"
      style={{
        ...GLASS_EFFECT,
        opacity: entry.isPaid ? 1 : 0.7,
        transform: entry.isPaid ? "none" : "scale(0.98)",
      }}
    >
      <Stack gap="xs">
        <Group justify="space-between" align="start">
          <div>
            <Text size="xl" fw={700} c="white">
              {entry.periodName}
            </Text>
            <Text size="sm" c="white" opacity={0.8}>
              {entry.dates.length} {entry.dates.length === 1 ? "день" : "дней"}
            </Text>
          </div>
          <Group gap="xs">
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => onEdit(entry)}
              title="Редактировать"
              disabled={isDeleting || isTogglingPaid}
            >
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete(entry.id)}
              title="Удалить"
              loading={isDeleting}
              disabled={isTogglingPaid}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Group>

        <Group gap="xs" wrap="wrap">
          {entry.dates.map((date) => (
            <Badge
              key={date}
              size="lg"
              radius="sm"
              variant="light"
              color={entry.isPaid ? "green" : "gray"}
            >
              {formatDate(new Date(date))}
            </Badge>
          ))}
        </Group>

        <Group justify="space-between" align="center" mt="xs">
          <Badge
            size="xl"
            radius="xl"
            variant="filled"
            color={entry.isPaid ? "green" : "gray"}
            style={{ cursor: isTogglingPaid ? "default" : "pointer" }}
            onClick={() => !isTogglingPaid && onTogglePaid(entry.id)}
            className={isTogglingPaid ? "loading" : ""}
          >
            {isTogglingPaid
              ? "Обновление..."
              : entry.isPaid
              ? "Оплачено"
              : "Не оплачено"}
          </Badge>
          <Text size="xl" fw={800} c="white">
            {totalAmount} {CURRENCY_SYMBOLS[entry.currency]}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}
