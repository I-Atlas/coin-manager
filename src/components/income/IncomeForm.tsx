import {
  Button,
  Checkbox,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { CURRENCIES } from "../../constants";
import { IncomeFormValues } from "../../types/income";

interface IncomeFormProps {
  form: UseFormReturnType<IncomeFormValues>;
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
}

export function IncomeForm({
  form,
  selectedDates,
  setSelectedDates,
  isEditing,
  onSubmit,
  submitting,
}: IncomeFormProps) {
  const inputStyles = {
    input: {
      transition: "all 0.2s ease",
      "&:focus": {
        background: "white",
        transform: "translateY(-2px)",
      },
    },
    label: {
      fontSize: "1rem",
      fontWeight: 600,
      marginBottom: "0.5rem",
    },
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="md">
        <TextInput
          label="Название периода"
          placeholder="Например: Зарплата за январь"
          {...form.getInputProps("periodName")}
          radius="lg"
          size="md"
          styles={inputStyles}
          disabled={submitting}
        />

        <DatePickerInput
          type="multiple"
          label="Выберите даты"
          placeholder="Выберите одну или несколько дат"
          value={selectedDates}
          onChange={setSelectedDates}
          clearable
          radius="lg"
          size="md"
          styles={inputStyles}
          mx="auto"
          w="100%"
          disabled={submitting}
        />

        <NumberInput
          label="Доход за день"
          placeholder="Введите сумму за день"
          {...form.getInputProps("dailyAmount")}
          radius="lg"
          size="md"
          styles={inputStyles}
          disabled={submitting}
        />

        <Select
          label="Валюта"
          data={CURRENCIES}
          {...form.getInputProps("currency")}
          radius="lg"
          size="md"
          styles={{
            ...inputStyles,
            dropdown: {
              borderRadius: "1rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.95)",
            },
          }}
          disabled={submitting}
        />

        <Checkbox
          label="Оплачено"
          {...form.getInputProps("isPaid", { type: "checkbox" })}
          size="md"
          styles={{
            input: {
              cursor: submitting ? "default" : "pointer",
              "&:checked": {
                background: "var(--mantine-color-green-6)",
                borderColor: "transparent",
              },
            },
            label: {
              fontSize: "1rem",
              fontWeight: 600,
              cursor: submitting ? "default" : "pointer",
            },
          }}
          disabled={submitting}
        />

        <Button
          type="submit"
          disabled={selectedDates.length === 0 || submitting}
          loading={submitting}
          radius="xl"
          size="md"
          style={{
            height: "3rem",
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          {isEditing ? "Сохранить изменения" : "Добавить доход"}
        </Button>
      </Stack>
    </form>
  );
}
