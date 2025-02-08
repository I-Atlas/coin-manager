import { Button, Group, NumberInput, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { incomeService } from "../../services/income.service";
import { CreateIncomeDTO } from "../../types/income";

interface IncomeFormProps {
  onSuccess?: () => void;
}

export function IncomeForm({ onSuccess }: IncomeFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateIncomeDTO>({
    amount: 0,
    description: "",
    date: new Date().toISOString(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await incomeService.create(formData);
      notifications.show({
        title: "Успех",
        message: "Доход успешно добавлен",
        color: "green",
      });
      setFormData({
        amount: 0,
        description: "",
        date: new Date().toISOString(),
      });
      onSuccess?.();
    } catch (error) {
      notifications.show({
        title: "Ошибка",
        message: error instanceof Error ? error.message : "Что-то пошло не так",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <NumberInput
        label="Сумма"
        placeholder="Введите сумму"
        required
        value={formData.amount}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, amount: Number(value) || 0 }))
        }
      />
      <TextInput
        label="Описание"
        placeholder="Введите описание"
        required
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        mt="md"
      />
      <DateInput
        label="Дата"
        placeholder="Выберите дату"
        required
        value={new Date(formData.date)}
        onChange={(date) =>
          setFormData((prev) => ({
            ...prev,
            date: date?.toISOString() || new Date().toISOString(),
          }))
        }
        mt="md"
      />
      <Group justify="flex-end" mt="xl">
        <Button type="submit" loading={loading}>
          Добавить
        </Button>
      </Group>
    </form>
  );
}
