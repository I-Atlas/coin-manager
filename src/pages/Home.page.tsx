import { Button, Container, Modal, Paper, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { IncomeCard } from "../components/income/IncomeCard";
import { IncomeForm } from "../components/income/IncomeForm";
import { TotalIncome } from "../components/income/TotalIncome";
import { GRADIENTS } from "../constants";
import { IncomeEntry, IncomeFormValues } from "../types";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  STORAGE_KEY,
} from "../utils/storage";

export function HomePage() {
  const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>(() =>
    loadFromLocalStorage(),
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [editingEntry, setEditingEntry] = useState<IncomeEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (incomeEntries.length > 0) {
      saveToLocalStorage(incomeEntries);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [incomeEntries]);

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

  const handleFormSubmit = form.onSubmit((values) => {
    if (selectedDates.length === 0) return;

    if (editingEntry) {
      setIncomeEntries((entries) =>
        entries.map((entry) =>
          entry.id === editingEntry.id
            ? {
                ...entry,
                ...values,
                dates: selectedDates,
              }
            : entry,
        ),
      );
      setEditingEntry(null);
    } else {
      const newEntry: IncomeEntry = {
        id: crypto.randomUUID(),
        dates: selectedDates,
        ...values,
      };
      setIncomeEntries([...incomeEntries, newEntry]);
    }

    setSelectedDates([]);
    setIsModalOpen(false);
    form.reset();
  });

  const handleEdit = (entry: IncomeEntry) => {
    setEditingEntry(entry);
    setSelectedDates(entry.dates);
    form.setValues({
      dailyAmount: entry.dailyAmount,
      currency: entry.currency,
      periodName: entry.periodName,
      isPaid: entry.isPaid,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setIncomeEntries((entries) => entries.filter((entry) => entry.id !== id));
  };

  const togglePaidStatus = (id: string) => {
    setIncomeEntries((entries) =>
      entries.map((entry) =>
        entry.id === id ? { ...entry, isPaid: !entry.isPaid } : entry,
      ),
    );
  };

  const totalsByCurrency = incomeEntries.reduce((acc, entry) => {
    if (entry.isPaid) {
      const totalAmount = entry.dailyAmount * entry.dates.length;
      acc[entry.currency] = (acc[entry.currency] || 0) + totalAmount;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <Container size="sm" py="xl">
      <Paper
        shadow="sm"
        p="xl"
        mb="md"
        radius="lg"
        bg={`linear-gradient(${GRADIENTS.header.deg}deg, ${GRADIENTS.header.from}, ${GRADIENTS.header.to})`}
      >
        <Stack>
          <Text size="xl" fw={700} ta="center" c="white">
            Учет доходов
          </Text>

          <Button
            onClick={() => {
              form.reset();
              setSelectedDates([]);
              setEditingEntry(null);
              setIsModalOpen(true);
            }}
            variant="white"
            radius="md"
            size="md"
            fullWidth
          >
            Добавить новый период
          </Button>
        </Stack>
      </Paper>

      <Modal
        opened={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingEntry(null);
          form.reset();
          setSelectedDates([]);
        }}
        title={editingEntry ? "Редактировать период" : "Новый период"}
        radius="md"
        size="md"
        centered
      >
        <IncomeForm
          form={form}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          isEditing={!!editingEntry}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      {incomeEntries.length > 0 && (
        <Paper shadow="sm" p="xl" radius="lg">
          <Stack>
            <Text size="lg" fw={700}>
              История доходов:
            </Text>
            {incomeEntries.map((entry) => (
              <IncomeCard
                key={entry.id}
                entry={entry}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onTogglePaid={togglePaidStatus}
              />
            ))}
            <TotalIncome totalsByCurrency={totalsByCurrency} />
          </Stack>
        </Paper>
      )}
    </Container>
  );
}
