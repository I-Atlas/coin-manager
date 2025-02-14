import { AppShell, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { LogoIcon } from "../assets/LogoIcon";
import { useAuth } from "../contexts";
import { Navbar } from "./Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();
  const { user } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    close();
  }, [pathname]);

  if (!user) {
    return <>{children}</>;
  }

  return (
    <AppShell
      header={{ height: { base: 60, md: 70 } }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding={{ base: "md", md: "xl" }}
    >
      <AppShell.Header>
        <Group h="100%" px={{ base: "xs", md: "md" }} justify="space-between">
          <Group gap="md">
            <LogoIcon size={32} />
            <Text size="lg" fw={700}>
              Coin Manager
            </Text>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={{ base: "xs", md: "md" }}>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
