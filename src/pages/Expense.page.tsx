import {
  Button,
  Group,
  Loader,
  Modal,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import {
  ExpenseCard,
  ExpenseChart,
  ExpenseForm,
  TotalExpense,
} from "../components/expense";
import { GLASS_EFFECT } from "../constants";
import { expenseService } from "../services/expense.service";
import { Expense, ExpenseFormValues } from "../types";

export function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingEntry, setEditingEntry] = useState<Expense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingExpenses, setLoadingExpenses] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const form = useForm<ExpenseFormValues>({
    initialValues: {
      amount: 0,
      currency: "RUB",
      category: "other",
      description: "",
    },
    validate: {
      amount: (value) => (value <= 0 ? "Сумма должна быть больше 0" : null),
      description: (value) => (!value ? "Введите описание" : null),
      category: (value) => (!value ? "Выберите категорию" : null),
    },
  });

  const loadExpenses = async () => {
    setLoadingExpenses(true);
    try {
      const data = await expenseService.getAll();
      setExpenses(data);
    } catch (error) {
      notifications.show({
        title: "Ошибка",
        message:
          error instanceof Error
            ? error.message
            : "Не удалось загрузить расходы",
        color: "red",
      });
    } finally {
      setLoadingExpenses(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleFormSubmit = form.onSubmit(async (values) => {
    if (!selectedDate) return;
    setSubmitting(true);

    try {
      let updatedExpense: Expense;
      if (editingEntry) {
        updatedExpense = await expenseService.update(editingEntry.id, {
          ...values,
          date: selectedDate.toISOString(),
        });
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === editingEntry.id ? updatedExpense : expense,
          ),
        );
        notifications.show({
          title: "Успех",
          message: "Расход успешно обновлен",
          color: "green",
        });
      } else {
        updatedExpense = await expenseService.create({
          ...values,
          date: selectedDate.toISOString(),
        });
        setExpenses((prevExpenses) => [updatedExpense, ...prevExpenses]);
        notifications.show({
          title: "Успех",
          message: "Расход успешно добавлен",
          color: "green",
        });
      }

      setSelectedDate(null);
      setIsModalOpen(false);
      form.reset();
      setEditingEntry(null);
    } catch (error) {
      notifications.show({
        title: "Ошибка",
        message: error instanceof Error ? error.message : "Что-то пошло не так",
        color: "red",
      });
    } finally {
      setSubmitting(false);
    }
  });

  const handleEdit = (expense: Expense) => {
    setEditingEntry(expense);
    setSelectedDate(new Date(expense.date));
    form.setValues({
      amount: expense.amount,
      currency: expense.currency,
      category: expense.category,
      description: expense.description,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await expenseService.delete(id);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id),
      );
      notifications.show({
        title: "Успех",
        message: "Расход успешно удален",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Ошибка",
        message:
          error instanceof Error ? error.message : "Не удалось удалить расход",
        color: "red",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Stack gap="lg">
        <Group justify="space-between" align="center">
          <Text size="xl" fw={800} visibleFrom="xs">
            Управление расходами
          </Text>
          <Button radius="xl" onClick={() => setIsModalOpen(true)}>
            Добавить расходы
          </Button>
        </Group>

        {loadingExpenses ? (
          <Paper p="lg" radius="xl" style={GLASS_EFFECT}>
            <Stack align="center">
              <Loader />
              <Text>Загрузка расходов...</Text>
            </Stack>
          </Paper>
        ) : expenses.length === 0 ? (
          <Paper p="lg" radius="xl" style={GLASS_EFFECT}>
            <Text ta="center">У вас пока нет расходов. Добавьте первый!</Text>
          </Paper>
        ) : (
          <>
            <ExpenseChart expenses={expenses} />
            <Stack gap="lg">
              <Text size="xl" fw={800} c="white">
                История расходов
              </Text>
              {expenses.map((expense, index) => (
                <ExpenseCard
                  key={index}
                  expense={expense}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isDeleting={deletingId === expense.id}
                />
              ))}
              <TotalExpense expenses={expenses} />
            </Stack>
          </>
        )}
      </Stack>

      <Modal
        opened={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          form.reset();
          setSelectedDate(null);
          setEditingEntry(null);
        }}
        title={editingEntry ? "Редактировать расход" : "Добавить расходы"}
        centered
        size="lg"
        radius="xl"
        fullScreen={false}
      >
        <ExpenseForm
          form={form}
          onSubmit={handleFormSubmit}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          submitting={submitting}
          isEditing={!!editingEntry}
        />
      </Modal>
    </>
  );
}
