"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Text,
  InputGroup,
  InputRightElement,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  IconButton,
  Flex,
  Avatar,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSearch, FaSort } from 'react-icons/fa';
// Types
interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
  phone: string;
  role: string
}

// Constants
const INITIAL_EMPLOYEES: Employee[] = [
  { id: 1, name: 'John Doe', department: 'IT', role: 'tester', email: 'john@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', department: 'HR', role: 'tester', email: 'jane@example.com', phone: '098-765-4321' },
];

// Components
const EmployeesPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);


  return (
    <Container maxW="container.xl" rounded="md">
      <Tabs
        isFitted
        variant='enclosed'
        mt={8}
        index={selectedTab}
        onChange={(index) => setSelectedTab(index)}
      >
        <TabList borderBottom="none">
          {['Today Attendance', 'Attendance', 'Permission Requests'].map((tab, index) => (
            <Tab
              key={tab}
              _selected={{ bg: 'white', color: 'blue' }}
              color="white"
            >
              {tab}
            </Tab>
          ))}
        </TabList>
        <TabPanels bg="white" rounded={'md'} borderTopRightRadius={selectedTab === 2 ? '0' : 'md'} borderTopLeftRadius={selectedTab === 0 ? '0' : 'md'} >
          <TabPanel>
            <Employees />
          </TabPanel>
          <TabPanel>
            <Box>
              <Heading size="md" mb={4}>Attendance</Heading>
              <Text>Employee attendance records.</Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
              <Heading size="md" mb={4}>Permission Requests</Heading>
              <Text>List of employee permission requests.</Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}


const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter(
    ({ name, department }) =>
      name.toLowerCase().includes(searchTerm) ||
      department.toLowerCase().includes(searchTerm)
  );

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    onOpen();
  };

  const handleAddEmployee = () => {
    // Implement add employee logic
    console.log('Add employee');
  };

  const handleEditEmployee = () => {
    // Implement edit employee logic
    console.log('Edit employee', selectedEmployee);
  };

  const handleDeleteEmployee = () => {
    // Implement delete employee logic
    console.log('Delete employee', selectedEmployee);
  };
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  const sortedEmployees = React.useMemo(() => {
    let sortableEmployees = [...filteredEmployees];
    if (sortConfig !== null) {
      sortableEmployees.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableEmployees;
  }, [filteredEmployees, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const bgColor = useColorModeValue('white', 'secondary');
  const textColor = useColorModeValue('black', 'white');
  const hoverBgColor = useColorModeValue('lightGray', 'lightSecondary');
  return (
    <Container maxW="container.xl" py={2}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between" w="full">
          <InputGroup maxW="md">
            <Input
              placeholder="Search by name or department"
              value={searchTerm}
              onChange={handleSearch}
              bg={bgColor}
              color={textColor}
              borderColor="mediumGray"
              _hover={{ borderColor: 'primary' }}
              _focus={{ borderColor: 'primary', boxShadow: `0 0 0 1px #3b82f6` }}
              borderRadius="md"
            />
            <InputRightElement>
              <IconButton
                aria-label="search"
                icon={<FaSearch />}
                size="sm"
                onClick={() => handleSearch}
                variant="ghost"
                color="primary"
              />
            </InputRightElement>
          </InputGroup>
          <Button colorScheme="teal" onClick={handleAddEmployee} borderRadius="full"

            color="white"
            _hover={{ bg: 'darkPrimary' }}
          >
            Add Employee
          </Button>
        </HStack>


        <Box overflowX="auto">
          <Table variant='striped' bg={bgColor} borderRadius="md" boxShadow="md">

            <Thead bg="secondary">
              <Tr>
                {['#', 'Name', 'Status', 'CheckIn Time', 'CheckIn Location', 'CheckOut Time', 'CheckOut Location', 'More Details'].map((header) => (
                  <Th key={header} onClick={() => requestSort(header.toLowerCase())}>
                    <HStack spacing={2}>
                      <Text>{header}</Text>
                      <FaSort />
                    </HStack>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {sortedEmployees.map(({ id, name, role, department, email, phone }) => (
                <Tr
                  key={id}
                  onClick={() => handleEmployeeClick({ id, name, department, email, phone, role })}
                  cursor="pointer"
                  _hover={{ bg: hoverBgColor }}
                  transition="background-color 0.2s"
                >
                  <Td>{1} </Td>
                  <Td>
                    <Text color={textColor}>{name}</Text>
                  </Td>
                  <Td>
                    <Badge bg="lightPrimary" color="darkPrimary" borderRadius="full" px={2}>
                      {role}
                    </Badge>
                  </Td>
                  <Td>{department}</Td>
                  <Td>{email}</Td>
                  <Td>{phone}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Employee Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedEmployee && (
                <VStack align="start" spacing={4}>
                  {Object.entries(selectedEmployee).map(([key, value]) => (
                    <Text key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                    </Text>
                  ))}
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleEditEmployee}>Edit</Button>
              <Button colorScheme="red" onClick={handleDeleteEmployee}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
};

export default EmployeesPage;