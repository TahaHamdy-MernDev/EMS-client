// export const ButtonStyle = defineStyleConfig({});
// export const ButtonStyle = defineStyleConfig({});

import { defineStyleConfig } from "@chakra-ui/react";
export const InputTheme = defineStyleConfig({
  sizes: {
    lg: {
      field: {
        borderRadius: "lg",
        fontSize: "xl",
        px: 2,
        py: 2,
      },
    },
  },
  variants: {
    main: {
      field: {
        color: "text.dark",
        bg: "gray.200",
        border: "2px",
        borderColor: "transparent",
        outline: "none",
        _placeholder: {
          color: "text.medium",
        },
        _hover: {
          borderColor: "secondary.main",
        },
        _active: {
          borderColor: "secondary.main",
        },
        _focus: {
          borderColor: "secondary.main",
        },
      },
    },
  },
  defaultProps: {
    size: "lg",
    variant: "main",
  },
});

export const ButtonTheme = defineStyleConfig({
  baseStyle: {
    fontFamily: "var(--font-robotoMono)",
    fontWeight: "bold",
    textTransform: "capitalize",
    borderRadius: "lg",
    _focus: {
      bg: "primary.dark",
    },
    transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
  },
  variants: {
    main: {
      bg: "primary.main",
      color: "text.white",
      border: "2px solid",
      _hover: {
        bg: "primary.dark",
        transform: "translateY(-1px)",
      },
      _active: {
        bg: "primary.darker",
        borderColor: "primary.darker",
      },
    },
    secondary: {
      bg: "secondary.base",
      color: "text.black",
      border: "1px solid",
      borderColor: "secondary.light",
      _hover: {
        bg: "secondary.light",
        transform: "translateY(-1px)",
      },
      _active: {
        bg: "secondary.dark",
        borderColor: "secondary.dark",
      },
    },
    danger: {
      bg: "red.500",
      color: "white",
      border: "1px solid",
      borderColor: "red.600",
      _hover: {
        bg: "red.600",
        transform: "translateY(-1px)",
      },
      _active: {
        bg: "red.700",
        borderColor: "red.700",
      },
    },
  },
  defaultProps: {
    variant: "main",
  },
});
