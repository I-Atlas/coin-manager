import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        navigate("/");
      } else {
        await signUp(email, password);
        notifications.show({
          title: "Успешная регистрация",
          message: "Пожалуйста, подтвердите ваш email адрес",
          color: "green",
        });
        navigate("/confirm-email");
      }
    } catch (error) {
      notifications.show({
        title: "Ошибка",
        message: error instanceof Error ? error.message : "Что-то пошло не так",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">
        {isLogin ? "Добро пожаловать!" : "Создайте аккаунт"}
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            required
            mt="md"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button type="submit" fullWidth mt="xl" loading={loading}>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>
        </form>

        <Text ta="center" mt="md">
          {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
          <Anchor onClick={() => setIsLogin(!isLogin)} fw={800}>
            {isLogin ? "Создать аккаунт" : "Войти"}
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
