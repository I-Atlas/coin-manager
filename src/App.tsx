import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { AppRouter } from "./Router";
import { AuthProvider } from "./contexts/AuthContext";

const theme = createTheme({
  primaryColor: "oklch-blue",
  colors: {
    "oklch-blue": [
      "oklch(96.27% 0.0217 238.66)",
      "oklch(92.66% 0.0429 240.01)",
      "oklch(86.02% 0.0827 241.66)",
      "oklch(78.2% 0.13 243.83)",
      "oklch(71.8% 0.1686 246.06)",
      "oklch(66.89% 0.1986 248.32)",
      "oklch(62.59% 0.2247 250.29)",
      "oklch(58.56% 0.2209 251.26)",
      "oklch(54.26% 0.2067 251.67)",
      "oklch(49.72% 0.1888 251.59)",
    ],
  },
});

export default function App() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="dark" forceColorScheme="dark" />
      <MantineProvider
        defaultColorScheme="dark"
        forceColorScheme="dark"
        theme={theme}
      >
        <Notifications />
        <AuthProvider>
          <DatesProvider settings={{ locale: "ru-RU" }}>
            <AppRouter />
          </DatesProvider>
        </AuthProvider>
      </MantineProvider>
    </>
  );
}
