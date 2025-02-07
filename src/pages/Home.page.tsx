import {
  ActionIcon,
  Button,
  Checkbox,
  Container,
  Group,
  MantineGradient,
  Modal,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface IncomeEntry {
  id: string;
  dates: Date[];
  dailyAmount: number;
  currency: string;
  periodName: string;
  isPaid: boolean;
}

const CURRENCIES = [
  { value: "RUB", label: "₽ (RUB)" },
  { value: "USD", label: "$ (USD)" },
  { value: "EUR", label: "€ (EUR)" },
];

const CURRENCY_SYMBOLS: Record<string, string> = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
};

// Добавим константы для градиентов
const GRADIENTS: Record<string, MantineGradient> = {
  header: { from: "#7950f2", to: "#4c6ef5", deg: 45 },
  income: { from: "#12b886", to: "#15aabf", deg: 45 },
  paper: { from: "#e9ecef", to: "#f8f9fa", deg: 45 },
};

// Добавим вспомогательные функции для работы с localStorage
const STORAGE_KEY = "incomeEntries";

const saveToLocalStorage = (entries: IncomeEntry[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const loadFromLocalStorage = (): IncomeEntry[] => {
  try {
    const savedEntries = localStorage.getItem(STORAGE_KEY);
    if (!savedEntries) return [];

    return JSON.parse(savedEntries).map((entry: IncomeEntry) => ({
      ...entry,
      dates: entry.dates.map((date: Date) => dayjs(date).toDate()),
    }));
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return [];
  }
};

export function HomePage() {
  const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>(() =>
    loadFromLocalStorage(),
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [editingEntry, setEditingEntry] = useState<IncomeEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Обновим useEffect для сохранения
  useEffect(() => {
    if (incomeEntries.length > 0) {
      saveToLocalStorage(incomeEntries);
    }
  }, [incomeEntries]);

  const form = useForm({
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

  const handleSubmit = form.onSubmit((values) => {
    if (selectedDates.length === 0) return;

    if (editingEntry) {
      setIncomeEntries((entries) =>
        entries.map((entry) =>
          entry.id === editingEntry.id
            ? {
                ...entry,
                dailyAmount: values.dailyAmount,
                currency: values.currency,
                periodName: values.periodName,
                dates: selectedDates,
                isPaid: values.isPaid,
              }
            : entry,
        ),
      );
      setEditingEntry(null);
    } else {
      const newEntry: IncomeEntry = {
        id: crypto.randomUUID(),
        dates: selectedDates,
        dailyAmount: values.dailyAmount,
        currency: values.currency,
        periodName: values.periodName,
        isPaid: values.isPaid,
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
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Название периода"
              placeholder="Например: Зарплата за январь"
              {...form.getInputProps("periodName")}
              radius="md"
              size="md"
            />

            <DatePickerInput
              type="multiple"
              label="Выберите даты"
              placeholder="Выберите одну или несколько дат"
              value={selectedDates}
              onChange={setSelectedDates}
              clearable
              radius="md"
              size="md"
            />

            <NumberInput
              label="Доход за день"
              placeholder="Введите сумму за день"
              {...form.getInputProps("dailyAmount")}
              radius="md"
              size="md"
            />

            <Select
              label="Валюта"
              data={CURRENCIES}
              {...form.getInputProps("currency")}
              radius="md"
              size="md"
            />

            <Checkbox
              label="Оплачено"
              {...form.getInputProps("isPaid", { type: "checkbox" })}
              size="md"
            />

            <Button
              type="submit"
              disabled={selectedDates.length === 0}
              radius="md"
              size="md"
              gradient={GRADIENTS.income}
              variant="gradient"
            >
              {editingEntry ? "Сохранить изменения" : "Добавить доход"}
            </Button>
          </Stack>
        </form>
      </Modal>

      {incomeEntries.length > 0 && (
        <Paper shadow="sm" p="xl" radius="lg">
          <Stack>
            <Text size="lg" fw={700}>
              История доходов:
            </Text>
            {incomeEntries.map((entry) => (
              <Paper
                key={entry.id}
                shadow="sm"
                p="md"
                radius="md"
                bg={`linear-gradient(${GRADIENTS.paper.deg}deg, ${GRADIENTS.paper.from}, ${GRADIENTS.paper.to})`}
              >
                <Stack gap="xs">
                  <Group grow>
                    <Group>
                      <Checkbox
                        checked={entry.isPaid}
                        onChange={() => togglePaidStatus(entry.id)}
                        label="Оплачено"
                        size="md"
                      />
                      <Text fw={600}>{entry.periodName}</Text>
                    </Group>
                    <Group gap="xs" justify="flex-end">
                      <ActionIcon
                        onClick={() => handleEdit(entry)}
                        color="blue"
                        variant="light"
                        radius="xl"
                        size="lg"
                      >
                        <IconEdit size={18} />
                      </ActionIcon>
                      <ActionIcon
                        onClick={() => handleDelete(entry.id)}
                        color="red"
                        variant="light"
                        radius="xl"
                        size="lg"
                      >
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Group>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {entry.dates
                      .map((date) => dayjs(date).format("DD.MM.YYYY"))
                      .join(", ")}
                  </Text>
                  <Stack gap={2}>
                    <Text fw={600} c={entry.isPaid ? "teal" : "dimmed"}>
                      {entry.dailyAmount} {CURRENCY_SYMBOLS[entry.currency]} в
                      день
                    </Text>
                    <Text size="sm" c="dimmed">
                      Всего за период:{" "}
                      <Text span fw={600} c={entry.isPaid ? "teal" : "dimmed"}>
                        {entry.dailyAmount * entry.dates.length}{" "}
                        {CURRENCY_SYMBOLS[entry.currency]}
                      </Text>
                    </Text>
                  </Stack>
                </Stack>
              </Paper>
            ))}
            <Paper
              shadow="sm"
              p="md"
              radius="md"
              bg={`linear-gradient(${GRADIENTS.income.deg}deg, ${GRADIENTS.income.from}, ${GRADIENTS.income.to})`}
            >
              <Stack gap="xs">
                <Text size="lg" fw={700} c="white">
                  Общий доход:
                </Text>
                {Object.entries(totalsByCurrency).map(([currency, total]) => (
                  <Text key={currency} fw={600} c="white" size="xl">
                    {total} {CURRENCY_SYMBOLS[currency]}
                  </Text>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Paper>
      )}
    </Container>
  );
}
