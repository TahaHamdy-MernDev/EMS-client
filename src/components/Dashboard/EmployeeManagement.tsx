import { Box, Heading, Text } from '@chakra-ui/react';

const EmployeeManagement = () => {
  return (
    <Box p="5">
      <Heading as="h2" size="xl" mb="5">Employee Management</Heading>
      <Text>Here you can add, update, or remove employee records.</Text>
    </Box>
  );
};

export default EmployeeManagement;
