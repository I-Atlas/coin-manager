import {
  ActionIcon,
  Avatar,
  Button,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router";
import { LogoutIcon } from "../assets";
import { useAuth } from "../contexts";

export function Navbar() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) return null;

  return (
    <Stack h="100%" justify="space-between">
      <Stack gap="xl">
        <Stack gap="xs">
          <Button
            variant={location.pathname === "/" ? "light" : "subtle"}
            radius="md"
            onClick={() => navigate("/")}
            justify="start"
            fullWidth
            size="md"
          >
            Доходы
          </Button>
          <Button
            variant={location.pathname === "/expenses" ? "light" : "subtle"}
            radius="md"
            onClick={() => navigate("/expenses")}
            justify="start"
            fullWidth
            size="md"
          >
            Расходы
          </Button>
        </Stack>
      </Stack>

      <Stack gap="md">
        <Divider />
        <Group>
          <Avatar radius="xl" color="blue" variant="filled">
            {user.email?.[0].toUpperCase()}
          </Avatar>
          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {user.email}
            </Text>
          </div>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={handleSignOut}
            radius="md"
            size="lg"
          >
            <LogoutIcon size={24} />
          </ActionIcon>
        </Group>
      </Stack>
    </Stack>
  );
}
