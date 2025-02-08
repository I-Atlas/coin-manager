import { Button, NumberInput, Select, Stack, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { CURRENCIES, INPUT_STYLES } from "../../constants";
import { ExpenseFormValues } from "../../types";

const EXPENSE_CATEGORIES = [
  { label: "Продукты", value: "groceries" },
  { label: "Транспорт", value: "transport" },
  { label: "Развлечения", value: "entertainment" },
  { label: "Здоровье", value: "health" },
  { label: "Коммунальные услуги", value: "utilities" },
  { label: "Одежда", value: "clothing" },
  { label: "Другое", value: "other" },
];

interface ExpenseFormProps {
  form: UseFormReturnType<ExpenseFormValues>;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
}

export function ExpenseForm({
  form,
  selectedDate,
  setSelectedDate,
  isEditing,
  onSubmit,
  submitting,
}: ExpenseFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Stack gap="md">
        <Select
          label="Категория"
          placeholder="Выберите категорию"
          data={EXPENSE_CATEGORIES}
          {...form.getInputProps("category")}
          radius="xl"
          size="md"
          styles={INPUT_STYLES}
          disabled={submitting}
        />

        <TextInput
          label="Описание"
          placeholder="Например: Продукты в Пятерочке"
          {...form.getInputProps("description")}
          radius="xl"
          size="md"
          styles={INPUT_STYLES}
          disabled={submitting}
        />

        <DatePickerInput
          label="Дата"
          placeholder="Выберите дату"
          value={selectedDate}
          onChange={setSelectedDate}
          clearable
          radius="xl"
          size="md"
          styles={INPUT_STYLES}
          mx="auto"
          w="100%"
          disabled={submitting}
        />

        <NumberInput
          label="Сумма"
          placeholder="Введите сумму"
          {...form.getInputProps("amount")}
          radius="xl"
          size="md"
          styles={INPUT_STYLES}
          disabled={submitting}
        />

        <Select
          label="Валюта"
          data={CURRENCIES}
          {...form.getInputProps("currency")}
          radius="xl"
          size="md"
          styles={{
            ...INPUT_STYLES,
            dropdown: {
              borderRadius: "1rem",
            },
          }}
          disabled={submitting}
        />

        <Button
          type="submit"
          disabled={!selectedDate || !form.isValid()}
          loading={submitting}
          radius="xl"
          size="md"
          style={{
            height: "3rem",
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          {isEditing ? "Сохранить изменения" : "Добавить расходы"}
        </Button>
      </Stack>
    </form>
  );
}
