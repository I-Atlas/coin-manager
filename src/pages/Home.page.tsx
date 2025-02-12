import {
  Button,
  Container,
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
import { IncomeCard, IncomeForm, TotalIncome } from "../components/income";
import { GLASS_EFFECT } from "../constants";
import { incomeService } from "../services";
import { Income, IncomeFormValues } from "../types";

export function HomePage() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [editingEntry, setEditingEntry] = useState<Income | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingIncomes, setLoadingIncomes] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingPaidId, setTogglingPaidId] = useState<string | null>(null);

  const form = useForm<IncomeFormValues>({
    initialValues: {
      dailyAmount: 0,
      currency: "RUB",
      periodName: "",
      isPaid: false,
    },
    validate: {
      dailyAmount: (value) =>
        value <= 0 ? "Сумма должна быть больше 0" : null,
      periodName: (value) => (!value ? "Введите название периода" : null),
    },
  });

  const loadIncomes = async () => {
    setLoadingIncomes(true);
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
      setLoadingIncomes(false);
    }
  };

  useEffect(() => {
    loadIncomes();
  }, []);

  const handleFormSubmit = form.onSubmit(async (values) => {
    if (selectedDates.length === 0) return;
    setSubmitting(true);

    try {
      let updatedIncome: Income;
      if (editingEntry) {
        updatedIncome = await incomeService.update(editingEntry.id, {
          ...values,
          dates: selectedDates.map((d) => d.toISOString()),
        });
        setIncomes((prevIncomes) =>
          prevIncomes.map((income) =>
            income.id === editingEntry.id ? updatedIncome : income,
          ),
        );
        notifications.show({
          title: "Успех",
          message: "Доход успешно обновлен",
          color: "green",
        });
      } else {
        updatedIncome = await incomeService.create({
          ...values,
          dates: selectedDates.map((d) => d.toISOString()),
        });
        setIncomes((prevIncomes) => [updatedIncome, ...prevIncomes]);
        notifications.show({
          title: "Успех",
          message: "Доход успешно добавлен",
          color: "green",
        });
      }

      setSelectedDates([]);
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

  const handleEdit = (entry: Income) => {
    setEditingEntry(entry);
    setSelectedDates(entry.dates.map((d) => new Date(d)));
    form.setValues({
      dailyAmount: entry.dailyAmount,
      currency: entry.currency,
      periodName: entry.periodName,
      isPaid: entry.isPaid,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await incomeService.delete(id);
      setIncomes((prevIncomes) =>
        prevIncomes.filter((income) => income.id !== id),
      );
      notifications.show({
        title: "Успех",
        message: "Доход успешно удален",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Ошибка",
        message:
          error instanceof Error ? error.message : "Не удалось удалить доход",
        color: "red",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePaid = async (id: string) => {
    setTogglingPaidId(id);
    try {
      const updatedIncome = await incomeService.togglePaid(id);
      setIncomes((prevIncomes) =>
        prevIncomes.map((income) =>
          income.id === id ? updatedIncome : income,
        ),
      );
    } catch (error) {
      notifications.show({
        title: "Ошибка",
        message:
          error instanceof Error ? error.message : "Не удалось изменить статус",
        color: "red",
      });
    } finally {
      setTogglingPaidId(null);
    }
  };

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Text size="xl" fw={800}>
            Управление доходами
          </Text>
          <Button radius="xl" onClick={() => setIsModalOpen(true)}>
            Добавить доход
          </Button>
        </Group>

        {loadingIncomes ? (
          <Paper p="lg" radius="xl" style={{ ...GLASS_EFFECT }}>
            <Stack align="center">
              <Loader />
              <Text>Загрузка доходов...</Text>
            </Stack>
          </Paper>
        ) : incomes.length === 0 ? (
          <Paper p="lg" radius="xl" style={{ ...GLASS_EFFECT }}>
            <Text ta="center">У вас пока нет доходов. Добавьте первый!</Text>
          </Paper>
        ) : (
          <Paper p="lg" radius="xl" style={{ ...GLASS_EFFECT }}>
            <Stack gap="lg">
              <Text size="xl" fw={800} c="white">
                История доходов
              </Text>
              {incomes.map((entry) => (
                <IncomeCard
                  key={entry.id}
                  entry={entry}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onTogglePaid={handleTogglePaid}
                  isDeleting={deletingId === entry.id}
                  isTogglingPaid={togglingPaidId === entry.id}
                />
              ))}
              <TotalIncome incomes={incomes} />
            </Stack>
          </Paper>
        )}
      </Stack>

      <Modal
        opened={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          form.reset();
          setSelectedDates([]);
          setEditingEntry(null);
        }}
        title={editingEntry ? "Редактировать доход" : "Добавить доход"}
        centered
        size="lg"
        radius="xl"
      >
        <IncomeForm
          form={form}
          onSubmit={handleFormSubmit}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          submitting={submitting}
          isEditing={!!editingEntry}
        />
      </Modal>
    </Container>
  );
}
