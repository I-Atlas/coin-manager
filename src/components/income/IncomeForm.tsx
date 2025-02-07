import {
  Button,
  Checkbox,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { CURRENCIES, GLASS_EFFECT, GRADIENTS, SHADOWS } from "../../constants";
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
  const inputStyles = {
    input: {
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "1rem",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      fontSize: "1rem",
      transition: "all 0.2s ease",
      "&:focus": {
        background: "white",
        transform: "translateY(-2px)",
        boxShadow: SHADOWS.card,
      },
    },
    label: {
      fontSize: "1rem",
      fontWeight: 600,
      marginBottom: "0.5rem",
    },
  };

  return (
    <Paper p="lg" radius="lg" style={GLASS_EFFECT}>
      <form onSubmit={onSubmit}>
        <Stack gap="md">
          <TextInput
            label="Название периода"
            placeholder="Например: Зарплата за январь"
            {...form.getInputProps("periodName")}
            radius="xl"
            size="md"
            styles={inputStyles}
          />

          <DatePickerInput
            type="multiple"
            label="Выберите даты"
            placeholder="Выберите одну или несколько дат"
            value={selectedDates}
            onChange={setSelectedDates}
            clearable
            radius="xl"
            size="md"
            styles={inputStyles}
            mx="auto"
            w="100%"
          />

          <NumberInput
            label="Доход за день"
            placeholder="Введите сумму за день"
            {...form.getInputProps("dailyAmount")}
            radius="xl"
            size="md"
            styles={inputStyles}
          />

          <Select
            label="Валюта"
            data={CURRENCIES}
            {...form.getInputProps("currency")}
            radius="xl"
            size="md"
            styles={{
              ...inputStyles,
              dropdown: {
                borderRadius: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                background: "rgba(255, 255, 255, 0.95)",
              },
            }}
          />

          <Checkbox
            label="Оплачено"
            {...form.getInputProps("isPaid", { type: "checkbox" })}
            size="md"
            styles={{
              input: {
                cursor: "pointer",
                "&:checked": {
                  background: `linear-gradient(45deg, ${GRADIENTS.success.from}, ${GRADIENTS.success.to})`,
                  borderColor: "transparent",
                },
              },
              label: {
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
              },
            }}
          />

          <Button
            type="submit"
            disabled={selectedDates.length === 0}
            radius="xl"
            size="md"
            variant="gradient"
            gradient={GRADIENTS.button}
            style={{
              boxShadow: SHADOWS.button,
              height: "3rem",
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            {isEditing ? "Сохранить изменения" : "Добавить доход"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
