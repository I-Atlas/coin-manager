import { AppShell, Button, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { LogoIcon } from "../assets/LogoIcon";
import { useAuth } from "../contexts";

export function Layout({ children }: { children: React.ReactNode }) {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return <>{children}</>;
  }

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <LogoIcon size={32} />
            <Text size="lg" fw={700}>
              Coin Manager
            </Text>
          </Group>
          <Group>
            <Text size="sm" c="dimmed">
              {user.email}
            </Text>
            <Button variant="transparent" radius="xl" onClick={handleSignOut}>
              Выйти
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
