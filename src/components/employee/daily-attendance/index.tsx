"use client";

import { Box, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AttendanceHeader from "./AttendanceHeader";
import Timer from "./Timer";
import ActionButtons from "./ActionButtons";
import Details from "./Details";
import { getAttendance } from "@/redux/actions/attendanceActions";
import { currentDayInEgypt } from "@/utils/time";
import { useAppDispatch } from "@/redux/reduxHooks";

export default function DailyAttendance() {
  const dispatch = useAppDispatch();
  const date = currentDayInEgypt();

  useEffect(() => {
    dispatch(getAttendance({ date }));
  }, [date, dispatch]);
  return (
    <Box
      minW={{ base: "xs", sm: "sm", md: "md" }}
      maxW={{ base: "sm", sm: "md", md: "lg" }}
      bg={"background.white"}
      shadow={"lg"}
      borderRadius={"lg"}
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 6 }}
    >
      <VStack>
        <AttendanceHeader />
        <Timer />
        <ActionButtons />
        <Details />
      </VStack>
    </Box>
  );
}
