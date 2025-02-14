import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { EditIcon, TrashIcon } from "../../assets";
import { CURRENCY_SYMBOLS, GLASS_EFFECT } from "../../constants";
import { Income } from "../../types";
import { formatDate } from "../../utils";

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
      radius="xl"
      style={{
        ...GLASS_EFFECT,
        opacity: entry.isPaid ? 1 : 0.7,
        transform: entry.isPaid ? "none" : "scale(0.98)",
      }}
    >
      <Stack gap="xs">
        <Group justify="space-between" align="start">
          <div>
            <Text size="xl" fw={800} c="white">
              {entry.periodName}
            </Text>
            <Text size="sm" c="white" opacity={0.8}>
              {entry.dates.length} {entry.dates.length === 1 ? "день" : "дней"}
            </Text>
          </div>
          <Group gap="xs">
            <ActionIcon
              radius="xl"
              variant="subtle"
              color="gray"
              onClick={() => onEdit(entry)}
              title="Редактировать"
              disabled={isDeleting || isTogglingPaid}
            >
              <EditIcon size={18} />
            </ActionIcon>
            <ActionIcon
              radius="xl"
              variant="subtle"
              color="red"
              onClick={() => onDelete(entry.id)}
              title="Удалить"
              loading={isDeleting}
              disabled={isTogglingPaid}
            >
              <TrashIcon size={18} />
            </ActionIcon>
          </Group>
        </Group>

        <Group gap="xs" wrap="wrap">
          {entry.dates.map((date, index) => (
            <Badge
              key={index}
              size="lg"
              radius="xl"
              variant="light"
              color={entry.isPaid ? "green" : "gray"}
            >
              {formatDate(new Date(date))}
            </Badge>
          ))}
        </Group>

        <Group justify="space-between" align="center" mt="xs">
          <Button
            radius="xl"
            variant="filled"
            color={entry.isPaid ? "green" : "gray"}
            onClick={() => !isTogglingPaid && onTogglePaid(entry.id)}
            loading={isTogglingPaid}
          >
            {entry.isPaid ? "Оплачено" : "Не оплачено"}
          </Button>
          <Text size="xl" fw={800} c="white">
            {totalAmount} {CURRENCY_SYMBOLS[entry.currency]}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}
