import { Paper, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { incomeService } from "../../services/income.service";

export function TotalIncome() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadTotal = async () => {
    try {
      const totalAmount = await incomeService.getTotal();
      setTotal(totalAmount);
    } catch (error) {
      notifications.show({
        title: "Ошибка",
        message:
          error instanceof Error
            ? error.message
            : "Не удалось загрузить общий доход",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTotal();
  }, []);

  return (
    <Paper withBorder p="xl" radius="md">
      <Title order={2} size="h3" mb="xs">
        Общий доход
      </Title>
      <Text size="xl" fw={700}>
        {loading ? "Загрузка..." : `${total.toLocaleString()} ₽`}
      </Text>
    </Paper>
  );
}
