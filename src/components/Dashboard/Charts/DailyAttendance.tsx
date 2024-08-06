"use client";
import React, { forwardRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Box, Text, VStack, HStack, Badge } from "@chakra-ui/react";

interface DataItem {
  date: string;
  checkIns: number;
}

const DailyAttendanceLineChart: React.FC = () => {
  const [focusBar, setFocusBar] = useState<number | null>(null);

  const data: DataItem[] = [
    { date: "01", checkIns: 50 },
    { date: "02", checkIns: 45 },
    { date: "03", checkIns: 60 },
    { date: "04", checkIns: 55 },
    { date: "05", checkIns: 70 },
  ];

  const average =
    data.reduce((sum, item) => sum + item.checkIns, 0) / data.length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          bg="white"
          p={2}
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
        >
          <Text fontWeight="bold">Date: {label}</Text>
          <Text>Check-ins: {payload[0].value}</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <VStack spacing={4} align="stretch" w="100%">
      <HStack justify="space-between">
        <Badge colorScheme="blue" fontSize="md">
          Average Check-ins: {average.toFixed(2)}
        </Badge>
        <Badge colorScheme="green" fontSize="md">
          Total Days: {data.length}
        </Badge>
      </HStack>
      <Box h="400px" w="100%" bg="#f3f4f6" borderRadius="md" >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            onMouseMove={(state) => {
              if (state.activeTooltipIndex) {
                setFocusBar(state.activeTooltipIndex);
              } else {
                setFocusBar(null);
              }
            }}
            onMouseLeave={() => setFocusBar(null)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine y={average}
              label="Average"
              stroke="red"
              strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="checkIns"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 6 }}
              activeDot={{
                r: 8,
                stroke: "#3b82f6",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />

          </LineChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  );
};

export default DailyAttendanceLineChart;
