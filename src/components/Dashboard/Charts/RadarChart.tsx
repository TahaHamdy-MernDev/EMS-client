"use client";
import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
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
  totalHours: number;
}

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
        <Text>Total Hours: {payload[0].value}</Text>
      </Box>
    );
  }
  return null;
};

const MemoizedAreaChart = React.memo(({ data, average, focusBar, setFocusBar }: {
  data: DataItem[];
  average: number;
  focusBar: number | null;
  setFocusBar: (index: number | null) => void;
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
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
      <XAxis />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <ReferenceLine
       
      />
      <Area
        type="monotone"
        dataKey="totalHours"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.3}
        activeDot={{
          r: 8,
          stroke: "#8884d8",
          strokeWidth: 2,
          fill: "#fff",
        }}
      />
      {focusBar !== null && (
        <ReferenceLine/>
      )}
    </AreaChart>
  </ResponsiveContainer>
));

MemoizedAreaChart.displayName = 'MemoizedAreaChart';

const AreaChartExample: React.FC = () => {
  const [focusBar, setFocusBar] = useState<number | null>(null);

  const data: DataItem[] = useMemo(() => [
    { date: "2023-01", totalHours: 40 },
    { date: "2023-02", totalHours: 35 },
    { date: "2023-03", totalHours: 45 },
    { date: "2023-04", totalHours: 50 },
  ], []);

  const average = useMemo(() =>
    data.reduce((sum, item) => sum + item.totalHours, 0) / data.length,
    [data]);

  return (
    <VStack spacing={4} align="stretch" w="100%">
      <HStack justify="space-between">
        <Badge colorScheme="blue" fontSize="md">
          Average Hours: {average.toFixed(2)}
        </Badge>
        <Badge colorScheme="green" fontSize="md">
          Total Months: {data.length}
        </Badge>
      </HStack>
      <Box h="400px" w="100%" bg="#f3f4f6" borderRadius="md">
        <MemoizedAreaChart
          data={data}
          average={average}
          focusBar={focusBar}
          setFocusBar={setFocusBar}
        />
      </Box>
    </VStack>
  );
};

export default AreaChartExample;