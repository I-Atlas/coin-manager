import { ActionIcon, Badge, Group, Paper, Stack, Text } from "@mantine/core";
import { EditIcon, TrashIcon } from "../../assets";
import { CURRENCY_SYMBOLS, GLASS_EFFECT } from "../../constants";
import { Expense } from "../../types";
import { formatDate } from "../../utils";

const CATEGORY_COLORS: Record<string, string> = {
  groceries: "blue",
  transport: "yellow",
  entertainment: "grape",
  health: "red",
  utilities: "cyan",
  clothing: "pink",
  other: "gray",
};

const CATEGORY_LABELS: Record<string, string> = {
  groceries: "Продукты",
  transport: "Транспорт",
  entertainment: "Развлечения",
  health: "Здоровье",
  utilities: "Коммунальные услуги",
  clothing: "Одежда",
  other: "Другое",
};

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function ExpenseCard({
  expense,
  onEdit,
  onDelete,
  isDeleting,
}: ExpenseCardProps) {
  return (
    <Paper p="lg" radius="lg" style={GLASS_EFFECT}>
      <Stack gap="xs">
        <Group justify="space-between" align="start">
          <div>
            <Group gap="xs">
              <Text size="xl" fw={800} c="white">
                {expense.description}
              </Text>
              <Badge
                size="lg"
                radius="xl"
                variant="light"
                color={CATEGORY_COLORS[expense.category]}
              >
                {CATEGORY_LABELS[expense.category]}
              </Badge>
            </Group>
            <Text size="sm" c="white" opacity={0.8}>
              {formatDate(new Date(expense.date))}
            </Text>
          </div>
          <Group gap="xs">
            <ActionIcon
              radius="xl"
              variant="subtle"
              color="gray"
              onClick={() => onEdit(expense)}
              title="Редактировать"
              disabled={isDeleting}
            >
              <EditIcon size={18} />
            </ActionIcon>
            <ActionIcon
              radius="xl"
              variant="subtle"
              color="red"
              onClick={() => onDelete(expense.id)}
              title="Удалить"
              loading={isDeleting}
            >
              <TrashIcon size={18} />
            </ActionIcon>
          </Group>
        </Group>

        <Group justify="flex-end" align="center" mt="xs">
          <Text size="xl" fw={800} c="white">
            {expense.amount} {CURRENCY_SYMBOLS[expense.currency]}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
}
