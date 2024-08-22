import { Box, Container, Spinner, Text } from "@chakra-ui/react";

const LoadingSpinner = () => (
  <Container
    maxW="container.xl"
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
    height="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Spinner size="xl" color="primary.main" thickness="4px"/>

  </Container>
);

export default LoadingSpinner;
