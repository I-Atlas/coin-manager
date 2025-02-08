import { Container, Stack } from "@mantine/core";
import { useState } from "react";
import { IncomeForm } from "../components/income/IncomeForm";
import { IncomeList } from "../components/income/IncomeList";
import { TotalIncome } from "../components/income/TotalIncome";

export function HomePage() {
  const [key, setKey] = useState(0);

  const handleSuccess = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <TotalIncome key={`total-${key}`} />
        <IncomeForm onSuccess={handleSuccess} />
        <IncomeList key={`list-${key}`} onDelete={handleSuccess} />
      </Stack>
    </Container>
  );
}
