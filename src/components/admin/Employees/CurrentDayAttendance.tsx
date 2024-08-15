"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  useColorModeValue,
  Tooltip,
  Progress,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { getUserLocation } from "@/utils/getUserLocation";

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
  ON_BREAK = "ON_BREAK",
}

interface AttendanceData {
  status: EmployeeDayStatus;
  checkIn: Date | null;
  checkOut: Date | null;
  totalHours: number;
  breaks: { start: Date; end: Date | null }[];
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
    case EmployeeDayStatus.ON_BREAK:
      return "yellow";
    default:
      return "gray";
  }
};

interface CurrentDayAttendanceProps {
  employeeId: string;
}

const CurrentDayAttendance: React.FC<CurrentDayAttendanceProps> = ({
  employeeId,
}) => {
  const [attendance, setAttendance] = useState<AttendanceData>({
    status: EmployeeDayStatus.NOT_STARTED,
    checkIn: null,
    checkOut: null,
    totalHours: 0,
    breaks: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        const response = await new Promise<AttendanceData>((resolve) =>
          setTimeout(
            () =>
              resolve({
                status: EmployeeDayStatus.STARTED,
                checkIn: new Date(new Date().setHours(14, 0, 0)),
                checkOut: null,
                totalHours: 0,
                breaks: [],
              }),
            2000
          )
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
  }, [attendance.status, attendance.checkIn, attendance.breaks]);

  const handleCheckIn = async() => {
    const userLocation = await getUserLocation();
    const now = new Date();
    setAttendance((prev) => ({
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

  const handleCheckOut = async() => {
    const userLocation = await getUserLocation();
    console.log(userLocation)
    onOpen();
  };

  const confirmCheckOut = () => {
    const now = new Date();
    setAttendance((prev) => ({
      ...prev,
      status: EmployeeDayStatus.CHECKED_OUT,
      checkOut: now,
      totalHours: prev.checkIn
        ? (now.getTime() - prev.checkIn.getTime()) / (1000 * 60 * 60)
        : 0,
    }));
    toast({
      title: "Checked Out",
      status: "success",
      duration: 2000,
    });
    onClose();
  };

  const formatTime = (date: Date | null): string => {
    return date ? date.toLocaleTimeString() : "Not recorded";
  };

  const formatElapsedTime = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const calculateProgress = (): number => {
    if (!attendance.checkIn) return 0;
    const now = new Date();
    const elapsed = now.getTime() - attendance.checkIn.getTime();
    const workday = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
    return Math.min((elapsed / workday) * 100, 100);
  };

  return (
    <Box
      bg={bgColor}
      p={8}
      borderRadius="xl"
      boxShadow="2xl"
      maxWidth="600px"
      width="100%"
    >
      {isLoading ? (
        <Progress size="sm" isIndeterminate />
      ) : (
        <VStack align="stretch" spacing={8}>
          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                Current Day Attendance
              </Text>
              <Text
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </VStack>
            <Tooltip label={attendance.status.replace(/_/g, " ")}>
              <Badge
                colorScheme={getStatusColor(attendance.status)}
                fontSize="md"
                p={2}
                borderRadius="full"
              >
                {attendance.status.replace(/_/g, " ")}
              </Badge>
            </Tooltip>
          </HStack>

          <Box
            textAlign="center"
            py={6}
            borderWidth={1}
            borderRadius="lg"
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <Text
              fontSize="sm"
              fontWeight="medium"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              Time Worked Today
            </Text>
            <Text fontSize="5xl" fontWeight="bold" color={textColor}>
              {formatElapsedTime(elapsedTime)}
            </Text>
            {attendance.status === EmployeeDayStatus.STARTED && (
              <Box mt={4} px={4}>
                <Text color={textColor} mb={2} fontWeight="bold">
                  Work Progress
                </Text>
                <Progress
                  value={calculateProgress()}
                  size="sm"
                  colorScheme="blue"
                  borderRadius="full"
                />
                <Text
                  color={useColorModeValue("gray.600", "gray.400")}
                  fontSize="sm"
                  mt={1}
                  textAlign="right"
                >
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
              width={["100%", "30%"]}
              mb={[4, 0]}
            >
              Check In
            </Button>
            <Button
              leftIcon={<FaSignOutAlt />}
              colorScheme="red"
              onClick={handleCheckOut}
              isDisabled={
                attendance.status !== EmployeeDayStatus.STARTED &&
                attendance.status !== EmployeeDayStatus.CHECKED_IN_NO_CHECKOUT
              }
              size="lg"
              width={["100%", "30%"]}
            >
              Check Out
            </Button>
          </HStack>

          <Box borderWidth={1} borderRadius="lg" p={4}>
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <Text fontWeight="bold" color={textColor}>
                  Check-in:
                </Text>
                <Text color={textColor}>{formatTime(attendance.checkIn)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold" color={textColor}>
                  Check-out:
                </Text>
                <Text color={textColor}>{formatTime(attendance.checkOut)}</Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Check Out</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to check out? This action cannot be undone.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={confirmCheckOut}>
              Confirm Check Out
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CurrentDayAttendance;
