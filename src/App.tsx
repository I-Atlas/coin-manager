import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Router } from "./Router";

const theme = createTheme({
  primaryColor: "bright-pink",
  colors: {
    "bright-pink": [
      "#F0BBDD",
      "#ED9BCF",
      "#EC7CC3",
      "#ED5DB8",
      "#F13EAF",
      "#F71FA7",
      "#FF00A1",
      "#E00890",
      "#C50E82",
      "#AD1374",
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
        <DatesProvider settings={{ locale: "ru-RU" }}>
          <Router />
        </DatesProvider>
      </MantineProvider>
    </>
  );
}
