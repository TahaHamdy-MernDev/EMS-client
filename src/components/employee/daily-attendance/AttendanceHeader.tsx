"use client";
import { useAppSelector } from "@/redux/reduxHooks";
import { EmployeeDayStatus } from "@/utils/enums";
import { getStatusColor } from "@/utils/helpers";
import { getFormattedDateInEgypt } from "@/utils/time";
import {
  Badge,
  Heading,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

export default function AttendanceHeader() {
  const { attendance } = useAppSelector((state) => state.attendance);
  const status =
    attendance?.status ?? EmployeeDayStatus.NOT_STARTED.replace(/_/g, " ");
  const formattedStatus = status?.replace(/_/g, " ");
  return (
    <VStack width={"full"} align="start" spacing={1}>
      <Text fontSize="sm">{getFormattedDateInEgypt()}</Text>
      <HStack w={"100%"} justify="space-between" align="center">
        <Heading fontSize={"2xl"}>Today&apos;s Record</Heading>

        <Tooltip label={formattedStatus}>
          <Badge
            colorScheme={getStatusColor(status)}
            fontSize="md"
            p={2}
            borderRadius="full"
          >
            {status}
          </Badge>
        </Tooltip>
      </HStack>
    </VStack>
  );
}
