import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast({
  colorMode: "dark",
});

interface ToastOptions {
  status: "error" | "info" | "loading" | "success" | "warning";
  title: string;
  description?: string;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top"
    | "bottom";
  duration?: number;
  isClosable?: boolean;
  variant?: "solid" | "subtle" | "left-accent" | "top-accent";
}

export const standALoneToast = ({
  status,
  title,
  description = "",
  position = "top-right",
  duration = 3000,
  isClosable = true,
}: ToastOptions) => {
  toast({
    variant: "top-accent",
    status,
    title,
    description,
    position,
    duration,
    isClosable,
  });
};
