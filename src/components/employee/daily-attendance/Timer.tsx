"use client";
import { useAppSelector } from "@/redux/reduxHooks";
import { EmployeeDayStatus } from "@/utils/enums";
import { getSpecificAction } from "@/utils/helpers";
import { parseTime } from "@/utils/time";
import { Box, Progress, Text, VStack } from "@chakra-ui/react";
import moment from "moment-timezone";
import { useCallback, useEffect, useState } from "react";

export default function Timer() {
  const { attendance } = useAppSelector((state) => state.attendance);
  const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");
  const [progress, setProgress] = useState<number>(0);
  const checkInTime =
    getSpecificAction({
      actions: attendance?.actions,
      typeToFind: EmployeeDayStatus.CHECKED_IN,
    })?.time ?? "";

  const checkOutTime = getSpecificAction({
    actions: attendance?.actions,
    typeToFind: EmployeeDayStatus.CHECKED_OUT,
  })?.time;

  const calculateTimeDifference = useCallback(() => {
    if (!checkInTime) return "00:00:00";

    const checkIn = moment.tz(checkInTime, "hh:mm:ss A", "Africa/Cairo");
    const now = moment().tz("Africa/Cairo");
    const checkOut = checkOutTime
      ? moment.tz(checkOutTime, "hh:mm:ss A", "Africa/Cairo")
      : now;

    const diffMs = checkOut.diff(checkIn);
    const duration = moment.duration(diffMs);
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }, [checkInTime, checkOutTime]);

  const calculateProgress = useCallback(() => {
    if (!checkInTime) {
      return 0;
    }

    const checkIn = moment.tz(checkInTime, "hh:mm:ss A", "Africa/Cairo");
    const now = moment().tz("Africa/Cairo");
    const checkOut = checkOutTime ? parseTime(checkOutTime) : now;
    const totalWorkHours = 8;
    const diffMs = checkOut.diff(checkIn);
    const duration = moment.duration(diffMs);
    const hoursWorked = duration.asHours();

    return (hoursWorked / totalWorkHours) * 100;
  }, [checkInTime, checkOutTime]);
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(calculateTimeDifference());
      setProgress(calculateProgress());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeDifference, calculateProgress]);

  return (
    <Box
      mt={2}
      w={"full"}
      textAlign="center"
      py={6}
      borderWidth={2}
      borderRadius="lg"
      borderColor={"gray.200"}
      p={4}
    >
      <VStack align="center">
        <Text fontSize="sm" fontWeight="medium">
          Time Worked Today
        </Text>
        <Text
          fontSize="6xl"
          fontFamily={"var(--font-robotoMono)"}
          fontWeight="bold"
        >
          {elapsedTime}
        </Text>
      </VStack>
      <VStack>
        <Progress
          value={progress}
          size="md"
          colorScheme="blue"
          mt={4}
          width="100%"
          borderRadius={'lg'}
        />
        <Text
          w={"full"}
          color={"text.dark"}
          fontSize="sm"
          mt={1}
          textAlign="right"
        >
          {progress.toFixed(1)}% of 8 hours
        </Text>
      </VStack>
    </Box>
  );
}
