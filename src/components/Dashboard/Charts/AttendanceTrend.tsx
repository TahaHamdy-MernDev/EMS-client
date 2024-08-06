"use client";
import React, { useState, forwardRef } from "react";
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
  name: string;
  attendance: number;
}
const AttendanceLineChart: React.FC = () => {
  const [focusBar, setFocusBar] = useState<number | null>(null);

  const data: DataItem[] = [
    { name: "07-01", attendance: 50 },
    { name: "07-02", attendance: 45 },
    { name: "07-03", attendance: 60 },
    { name: "07-04", attendance: 55 },
    { name: "07-05", attendance: 70 },
  ];

  const average =
    data.reduce((sum, item) => sum + item.attendance, 0) / data.length;

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
          <Text>Attendance: {payload[0].value}</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <VStack spacing={4} align="stretch" w="100%">
      <HStack justify="space-between">
        <Badge colorScheme="blue" fontSize="md">
          Average Attendance: {average.toFixed(2)}
        </Badge>
        <Badge colorScheme="green" fontSize="md">
          Total Days: {data.length}
        </Badge>
      </HStack>
      <Box
        bg="#f3f4f6"
        display="flex"
        justifyContent="center"
        width="100%"
        height="400px"
        rounded="md"
        p={4}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            onMouseMove={(state) => {
              if (state.activeTooltipIndex !== undefined) {
                setFocusBar(state.activeTooltipIndex);
              } else {
                setFocusBar(null);
              }
            }}
            onMouseLeave={() => setFocusBar(null)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine
              y={average}
              label="Average"
              stroke="red"
              strokeDasharray="3 3"
              ifOverflow="extendDomain"
            />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 6 }}
              activeDot={{
                r: 8,
                stroke: "#8884d8",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
            {focusBar !== null && (
              <ReferenceLine
                x={data[focusBar].name}
                stroke="#8884d8"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  );
};

export default AttendanceLineChart;