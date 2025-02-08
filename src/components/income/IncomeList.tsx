import { ActionIcon, Card, Group, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { incomeService } from "../../services/income.service";
import { Income } from "../../types/income";
import { formatDate } from "../../utils/date";

interface IncomeListProps {
  onDelete?: () => void;
}

export function IncomeList({ onDelete }: IncomeListProps) {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);

  const loadIncomes = async () => {
    try {
      const data = await incomeService.getAll();
      setIncomes(data);
    } catch (error) {
      notifications.show({
        title: "Ошибка",
        message:
          error instanceof Error
            ? error.message
            : "Не удалось загрузить доходы",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await incomeService.delete(id);
      notifications.show({
        title: "Успех",
        message: "Доход успешно удален",
        color: "green",
      });
      onDelete?.();
      await loadIncomes();
    } catch (error) {
      notifications.show({
        title: "Ошибка",
        message:
          error instanceof Error ? error.message : "Не удалось удалить доход",
        color: "red",
      });
    }
  };

  useEffect(() => {
    loadIncomes();
  }, []);

  if (loading) {
    return <Text>Загрузка...</Text>;
  }

  if (incomes.length === 0) {
    return <Text>Нет доходов</Text>;
  }

  return (
    <Stack gap="md">
      <Title order={2}>История доходов</Title>
      {incomes.map((income) => (
        <Card key={income.id} withBorder shadow="sm">
          <Group justify="space-between" align="start">
            <div>
              <Text size="lg" fw={500}>
                {income.description}
              </Text>
              <Text size="sm" c="dimmed">
                {formatDate(new Date(income.date))}
              </Text>
            </div>
            <Group gap="xs">
              <Text size="xl" fw={700}>
                {income.amount.toLocaleString()} ₽
              </Text>
              <ActionIcon
                color="red"
                variant="subtle"
                onClick={() => handleDelete(income.id)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Group>
        </Card>
      ))}
    </Stack>
  );
}
