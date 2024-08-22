import { Container } from "@chakra-ui/react";
import React from "react";

export default function CustomContainer({
  children,
  flex = true,
}: Readonly<{ children: React.ReactNode; flex?: boolean }>) {
  return (
    <Container
      maxW="container.xl"
      minH="calc(100svh - 3.5rem)"
      {...(flex && {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      {children}
    </Container>
  );
}
