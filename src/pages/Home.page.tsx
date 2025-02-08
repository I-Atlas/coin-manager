import {
  Button,
  Container,
  Loader,
  Modal,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { IncomeCard } from "../components/income/IncomeCard";
import { IncomeForm } from "../components/income/IncomeForm";
import { TotalIncome } from "../components/income/TotalIncome";
import { GLASS_EFFECT } from "../constants";
import { incomeService } from "../services/income.service";
import { Income, IncomeFormValues } from "../types/income";

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

  if (loadingIncomes) {
    return (
      <Container size="sm" py="xl">
        <Paper p="xl" radius="xl" style={GLASS_EFFECT}>
          <Stack align="center" gap="md">
            <Loader color="blue" size="xl" type="bars" />
            <Text size="xl" fw={700} ta="center" c="white">
              Загрузка данных...
            </Text>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Paper p="xl" mb="xl" radius="xl" style={GLASS_EFFECT}>
        <Stack gap="lg">
          <Text
            size="2rem"
            fw={800}
            ta="center"
            c="white"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
          >
            Учет доходов
          </Text>

          <Button
            onClick={() => {
              form.reset();
              setSelectedDates([]);
              setEditingEntry(null);
              setIsModalOpen(true);
            }}
            radius="xl"
            size="lg"
            fullWidth
          >
            Добавить новый период
          </Button>
        </Stack>
      </Paper>

      <Modal
        opened={isModalOpen}
        onClose={() => {
          if (!submitting) {
            setIsModalOpen(false);
            setEditingEntry(null);
            form.reset();
            setSelectedDates([]);
          }
        }}
        title={
          <Text size="xl" fw={700} mb="md">
            {editingEntry ? "Редактировать период" : "Новый период"}
          </Text>
        }
        radius="xl"
        size="lg"
        centered
        overlayProps={{
          blur: 8,
          opacity: 0.55,
        }}
        closeOnClickOutside={!submitting}
        closeOnEscape={!submitting}
      >
        <IncomeForm
          form={form}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          isEditing={!!editingEntry}
          onSubmit={handleFormSubmit}
          submitting={submitting}
        />
      </Modal>

      {incomes.length > 0 && (
        <Paper
          p="xl"
          radius="xl"
          style={{
            ...GLASS_EFFECT,
          }}
        >
          <Stack gap="lg">
            <Text size="xl" fw={800} ta="center" c="white">
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
    </Container>
  );
}
