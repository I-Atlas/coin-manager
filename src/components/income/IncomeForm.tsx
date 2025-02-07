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
import { CURRENCIES, GRADIENTS } from "../../constants";
import { IncomeFormValues } from "../../types";

interface IncomeFormProps {
  form: UseFormReturnType<IncomeFormValues>;
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function IncomeForm({
  form,
  selectedDates,
  setSelectedDates,
  isEditing,
  onSubmit,
}: IncomeFormProps) {
  return (
    <form onSubmit={onSubmit}>
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
          {isEditing ? "Сохранить изменения" : "Добавить доход"}
        </Button>
      </Stack>
    </form>
  );
}
