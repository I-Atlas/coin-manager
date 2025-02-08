import { Container, Paper, Text, Title } from "@mantine/core";

export function EmailConfirmationPage() {
  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p="lg" radius="xl">
        <Title order={2} ta="center" mb="md">
          Подтвердите ваш email
        </Title>
        <Text size="md" ta="center" mb="sm">
          На ваш email адрес было отправлено письмо с ссылкой для подтверждения.
        </Text>
        <Text size="sm" c="dimmed" ta="center">
          Пожалуйста, проверьте вашу почту и перейдите по ссылке для
          подтверждения email адреса.
        </Text>
      </Paper>
    </Container>
  );
}
