import { Container, Paper, Text, Title } from "@mantine/core";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export function EmailConfirmationPage() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (user.email_confirmed_at) {
    return <Navigate to="/" />;
  }

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p="xl" radius="md">
        <Title order={2} ta="center" mb="md">
          Подтвердите ваш email
        </Title>
        <Text size="md" ta="center" mb="sm">
          На ваш email адрес {user.email} было отправлено письмо с ссылкой для
          подтверждения.
        </Text>
        <Text size="sm" c="dimmed" ta="center">
          Пожалуйста, проверьте вашу почту и перейдите по ссылке для
          подтверждения email адреса. После подтверждения обновите эту страницу.
        </Text>
      </Paper>
    </Container>
  );
}
