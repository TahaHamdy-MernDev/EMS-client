import { border, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      primary: {
        main: "#1E88E5",
        light: "#64B5F6",
        dark: "#1565C0",
      },
      secondary: {
        main: "#43A047",
        light: "#66BB6A",
        dark: "#2E7D32",
      },
      accent: {
        main: "#FFA000",
        light: "#FFB74D",
        dark: "#FF8F00",
      },
      error: {
        main: "#E53935",
        light: "#EF5350",
        dark: "#C62828",
      },
      background: {
        default: "#F5F5F5",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#212121",
        secondary: "#757575",
      },
      border: "#E0E0E0",
      hover: "#BBDEFB",
      navbar: {
        bg: "#1E88E5",
        text: "#FFFFFF",
        activeBackground: "#1565C0",
        hoverBackground: "#64B5F6",
      },
    },
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "medium",
      },
      variants: {
        primary: {
          bg: "brand.primary.main",
          color: "white",
          _hover: { bg: "brand.primary.dark" },
        },
        secondary: {
          bg: "brand.secondary.main",
          color: "white",
          _hover: { bg: "brand.secondary.dark" },
        },
        accent: {
          bg: "brand.accent.main",
          color: "white",
          _hover: { bg: "brand.accent.dark" },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          border: "0",
          borderColor: "brand.primary.light",
          _hover: { borderColor: "brand.primary.light" },
          _focus: {
            borderColor: "brand.primary.main",
            boxShadow: "0 0 0 1px #1E88E5",
          },
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: "brand.border",
          _checked: {
            bg: "brand.primary.main",
            borderColor: "brand.primary.main",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "brand.text.primary",
      },
    },
    Text: {
      baseStyle: {
        color: "brand.text.primary",
      },
      variants: {
        secondary: {
          color: "brand.text.secondary",
        },
      },
    },
    Link: {
      baseStyle: {
        color: "brand.primary.main",
        _hover: { textDecoration: "underline" },
      },
    },
    Card: {
      baseStyle: {
        p: 4,
        borderRadius: "md",
        bg: "brand.background.paper",
        boxShadow: "md",
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.background.default",
        color: "brand.text.primary",
      },
    },
  },
});

export default theme;
