import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#e6f0ff",
      100: "#b3d1ff",
      200: "#80b3ff",
      300: "#4d94ff",
      400: "#1a75ff",
      500: "#3b82f6", // Custom primary color
      600: "#0052cc",
      700: "#003d99",
      800: "#002966",
      900: "#001433",
    },
    secondary: {
      50: "#e6e8ec",
      100: "#b3b9c7",
      200: "#808ba2",
      300: "#4d5c7d",
      400: "#1a2e58",
      500: "#020B27", // Custom secondary color
      600: "#01091f",
      700: "#010717",
      800: "#00040f",
      900: "#000208",
    },
    lightPrimary: "#93c5fd",
    darkPrimary: "#1e40af",
    lightSecondary: "#323b4b",
    darkSecondary: "#010514",
    white: "#ffffff",
    lightGray: "#f3f4f6",
    mediumGray: "#9ca3af",
    darkGray: "#4b5563",
    black: "#000000",
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "primary.500",
          color: "white",
          _hover: {
            bg: "primary.600",
          },
          _active: {
            bg: "primary.700",
          },
        },
        secondary: {
          bg: "secondary.500",
          color: "white",
          _hover: {
            bg: "secondary.600",
          },
          _active: {
            bg: "secondary.700",
          },
        },
        third: {
          bg: "primary.500",
          color: "white",
          boxShadow: "0px 4px 0px primary.700",
          transition: "all 0.2s",
          _hover: {
            transform: "translateY(-2px)",
            boxShadow: "0px 6px 0px primary.700",
          },
          _active: {
            transform: "translateY(0px)",
            boxShadow: "0px 0px 0px primary.700",
            bg: "primary.600",
          },
        },
      },
    },
    Link: {
      variants: {
        primary: {
          textDecoration: "none",
          _hover: {
            bg: "primary.700",
            color: "white",
            textDecoration: "none",
          },
          _active: {
            textDecoration: "none",
            bg: "primary.700",
            color: "white",
          },
        },
        secondary: {
          color: "secondary.500",
          _hover: {
            color: "secondary.600",
          },
          _active: {
            color: "secondary.700",
          },
        },
        third: {
          color: "primary.500",
          textDecoration: "none",
          _hover: {
            textDecoration: "underline",
          },
          _active: {
            color: "primary.700",
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "black",
      },
    },
  },
});

export default theme;
