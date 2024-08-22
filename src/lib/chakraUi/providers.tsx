"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <ChakraProvider
        theme={theme}
        toastOptions={{
          defaultOptions: {
            position: "top-right",
            variant: "top-accent",
            duration: 3000,
            isClosable: true,
            size:'md'
          },
        }}
      >
        {children}
      </ChakraProvider>
    </Provider>
  );
}
