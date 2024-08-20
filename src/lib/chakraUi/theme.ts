import { openSans, robotoMono, sourceCodePro } from "@/app/fonts";
import { extendTheme } from "@chakra-ui/react";
import { ButtonTheme, InputTheme } from "./customComponent";
const breakpoints = {
  base: "0em", // 0px
  sm: "30em", // ~480px. em is a relative unit and is dependant on the font-size.
  md: "48em", // ~768px
  lg: "62em", // ~992px
  xl: "80em", // ~1280px
  "2xl": "96em", // ~1536px
};
export const theme = extendTheme({
  fonts: {
    heading: robotoMono.style.fontFamily,
    body: openSans.style.fontFamily,
    mono: sourceCodePro.style.fontFamily,
  },
  colors: {
    primary: {
      main: "#003366", // Navy Blue
      dark: "#002244", // Darker Navy Blue for hover
      darker: "#001122", // Even darker Navy Blue for active
    },
    secondary: {
      main: "#4A90E2", // Light Blue
      dark: "#357ABD", // Darker Light Blue for hover
      darker: "#2A5C99", // Even darker Light Blue for active
    },
    accent: "#F5A623", // Orange
    background: {
      light: "#F5F5F5",
      white: "#FFFFFF",
      dark: "#E0E0E0", // Darker shade for background variations
    },
    text: {
      dark: "#333333",
      medium: "#666666",
      light: "#999999", // Lighter gray for less emphasis
      white: "#FFFFFF",
    },
  },
  styles: {
    global: {
      body: {
        fontSize: "md",
        bg: "background.light",
        color: "text.dark",
        minHeight: "100svh",
      },
      svg:{
        color:"primary.dark"
      }
    },
  },
  components: {
    Input: InputTheme,
    Button: ButtonTheme,
  },
});
