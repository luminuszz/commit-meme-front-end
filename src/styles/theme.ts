import { extendTheme, Theme, theme as baseTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },

  styles: {
    body: {
      backgroundColor: "#111827",
    },
  },
} as Theme);
