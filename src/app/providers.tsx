"use client";

import store from "@/store";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import theme from "./theme";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <ChakraProvider
        toastOptions={{
          defaultOptions: {
            variant: 'top-accent',
            isClosable: true,
            duration: 4000,
          },
        }}
        theme={theme} cssVarsRoot={undefined}      >
        {children}
      </ChakraProvider>
    </Provider>
  );
}
