"use client"
import React, { useState, useEffect } from 'react';
import {
  Box, VStack, HStack, Text, Button, Badge, useColorModeValue,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Table, Thead, Tbody, Tr, Th, Td, Tooltip, Progress, useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid
} from '@chakra-ui/react';
import { FaClock, FaSignInAlt, FaSignOutAlt, FaInfoCircle, FaStopwatch } from 'react-icons/fa';

enum EmployeeDayStatus {
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  CHECKED_OUT = "CHECKED_OUT",
  DAY_COMPLETED = "DAY_COMPLETED",
  CHECKED_IN_NO_CHECKOUT = "CHECKED_IN_NO_CHECKOUT",
  OUT_SICK = "OUT_SICK",
  EARLY_OUT = "EARLY_OUT",
  ABSENT = "ABSENT",
  TEMPORARILY_UNAVAILABLE = "TEMPORARILY_UNAVAILABLE",
  PERMISSION_GRANTED = "PERMISSION_GRANTED",
}

interface AttendanceData {
  status: EmployeeDayStatus;
  checkIn: Date | null;
  checkOut: Date | null;
  totalHours: number;
}

const getStatusColor = (status: EmployeeDayStatus): string => {
  switch (status) {
    case EmployeeDayStatus.NOT_STARTED:
      return "gray";
    case EmployeeDayStatus.STARTED:
    case EmployeeDayStatus.CHECKED_IN_NO_CHECKOUT:
      return "blue";
    case EmployeeDayStatus.CHECKED_OUT:
    case EmployeeDayStatus.DAY_COMPLETED:
      return "green";
    case EmployeeDayStatus.OUT_SICK:
    case EmployeeDayStatus.ABSENT:
      return "red";
    case EmployeeDayStatus.EARLY_OUT:
      return "orange";
    case EmployeeDayStatus.TEMPORARILY_UNAVAILABLE:
      return "purple";
    case EmployeeDayStatus.PERMISSION_GRANTED:
      return "teal";
    default:
      return "gray";
  }
};

interface CurrentDayAttendanceProps {
  employeeId: string;
}

const CurrentDayAttendance: React.FC<CurrentDayAttendanceProps> = ({ employeeId }) => {
  const [attendance, setAttendance] = useState<AttendanceData>({
    status: EmployeeDayStatus.NOT_STARTED,
    checkIn: null,
    checkOut: null,
    totalHours: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const textColor1 = useColorModeValue('gray.800', 'white');
  const textColo2 = useColorModeValue('gray.600', 'gray.400')

  const toast = useToast();

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        // Simulating API call
        const response = await new Promise<AttendanceData>(resolve =>
          setTimeout(() => resolve({
            status: EmployeeDayStatus.STARTED,
            checkIn: new Date(new Date().setHours(14, 0, 0)),
            checkOut: null,
            totalHours: 0,
          }), 1000)
        );
        setAttendance(response);
      } catch (error) {
        toast({
          title: "Error fetching attendance data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, [employeeId, toast]);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (attendance.status === EmployeeDayStatus.STARTED && attendance.checkIn) {
      timer = setInterval(() => {
        const now = new Date();
        const elapsed = now.getTime() - attendance.checkIn!.getTime();
        setElapsedTime(elapsed);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [attendance.status, attendance.checkIn]);
  const handleCheckIn = () => {
    const now = new Date();
    setAttendance(prev => ({
      ...prev,
      status: EmployeeDayStatus.STARTED,
      checkIn: now,
    }));
    setElapsedTime(0);
    toast({
      title: "Checked In",
      status: "success",
      duration: 2000,
    });
  };

  const handleCheckOut = () => {
    const now = new Date();
    setAttendance(prev => ({
      ...prev,
      status: EmployeeDayStatus.CHECKED_OUT,
      checkOut: now,
      totalHours: prev.checkIn ? (now.getTime() - prev.checkIn.getTime()) / (1000 * 60 * 60) : 0,
    }));
    toast({
      title: "Checked Out",
      status: "success",
      duration: 2000,
    });
  };

  const formatTime = (date: Date | null): string => {
    return date ? date.toLocaleTimeString() : 'Not recorded';
  };

  const formatElapsedTime = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = (): number => {
    if (!attendance.checkIn) return 0;
    const now = new Date();
    const elapsed = now.getTime() - attendance.checkIn.getTime();
    const workday = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
    return Math.min((elapsed / workday) * 100, 100);
  };


  return (
    <Box bg={bgColor} p={8} borderRadius="xl" boxShadow="2xl" maxWidth="600px" width="100%">
      <VStack align="stretch" spacing={8}>
        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Text fontSize="3xl" fontWeight="bold" color={textColor}>Current Day Attendance</Text>
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
          </VStack>
          <Tooltip label={attendance.status.replace(/_/g, ' ')}>
            <Badge colorScheme={getStatusColor(attendance.status)} fontSize="md" p={2} borderRadius="full">
              {attendance.status.replace(/_/g, ' ')}
            </Badge>
          </Tooltip>
        </HStack>

        {isLoading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <>
            <Box
              textAlign="center"
              py={6}
              borderWidth={1}
              borderRadius="lg"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <Text fontSize="sm" fontWeight="medium" color={useColorModeValue('gray.600', 'gray.400')}>Time Worked Today</Text>
              <Text fontSize="5xl" fontWeight="bold" color={textColor}>
                {formatElapsedTime(elapsedTime)}
              </Text>
              {attendance.status === EmployeeDayStatus.STARTED && (
                <Box mt={4} px={4}>
                  <Text color={textColor} mb={2} fontWeight="bold">Work Progress</Text>
                  <Progress value={calculateProgress()} size="sm" colorScheme="blue" borderRadius="full" />
                  <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm" mt={1} textAlign="right">
                    {calculateProgress().toFixed(1)}% of 8 hours
                  </Text>
                </Box>
              )}
            </Box>

            <HStack justify="space-between" wrap="wrap">
              <Button
                leftIcon={<FaSignInAlt />}
                colorScheme="green"
                onClick={handleCheckIn}
                isDisabled={attendance.status !== EmployeeDayStatus.NOT_STARTED}
                size="lg"
                width={['100%', '45%']}
                mb={[4, 0]}
              >
                Check In
              </Button>
              <Button
                leftIcon={<FaSignOutAlt />}
                colorScheme="red"
                onClick={handleCheckOut}
                isDisabled={attendance.status !== EmployeeDayStatus.STARTED && attendance.status !== EmployeeDayStatus.CHECKED_IN_NO_CHECKOUT}
                size="lg"
                width={['100%', '45%']}
              >
                Check Out
              </Button>
            </HStack>

            <Box borderWidth={1} borderRadius="lg" p={4}>
              <VStack align="stretch" spacing={4}>
                <HStack justify="space-between">
                  <Text fontWeight="bold" color={textColor}>Check-in:</Text>
                  <Text color={textColor}>{formatTime(attendance.checkIn)}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontWeight="bold" color={textColor}>Check-out:</Text>
                  <Text color={textColor}>{formatTime(attendance.checkOut)}</Text>
                </HStack>
              </VStack>
            </Box>
            {/* <Button
              onClick={() => setIsModalOpen(true)}
              colorScheme="blue"
              variant="outline"
              leftIcon={<FaInfoCircle />}
              size="lg"
              width="100%"
            >
              View Detailed Attendance Report
            </Button> */}
          </>
        )}
      </VStack>

      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered size="xl">
        <ModalOverlay />
        <ModalContent bg={bgColor}>
          <ModalHeader color={textColor}>Detailed Attendance Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>Today&apos;s Attendance</Text>
                <Table variant="simple" size="sm">
                  <Tbody>
                    <Tr>
                      <Td fontWeight="bold" color={textColor}>Status</Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(attendance.status)}>
                          {attendance.status.replace(/_/g, ' ')}
                        </Badge>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold" color={textColor}>Check-in Time</Td>
                      <Td color={textColor}>{formatTime(attendance.checkIn)}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold" color={textColor}>Check-out Time</Td>
                      <Td color={textColor}>{formatTime(attendance.checkOut)}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold" color={textColor}>Time Worked</Td>
                      <Td color={textColor}>{formatElapsedTime(elapsedTime)}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold" color={textColor}>Total Hours</Td>
                      <Td color={textColor}>{attendance.totalHours.toFixed(2)}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>Weekly Summary</Text>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Day</Th>
                      <Th>Hours</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
                      <Tr key={index + 1}>
                        <Td>{day}</Td>
                        <Td>{(Math.random() * 8 + 1).toFixed(2)}</Td>
                        <Td>
                          <Badge colorScheme={index === 2 ? 'green' : 'gray'}>
                            {index === 2 ? 'Present' : 'Not Started'}
                          </Badge>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
};

export default CurrentDayAttendance;