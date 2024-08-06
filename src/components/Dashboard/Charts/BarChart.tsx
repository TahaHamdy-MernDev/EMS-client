"use client";
import React, { useState, useMemo, forwardRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { Box, Text, VStack, HStack, Badge, Select } from "@chakra-ui/react";

interface DataItem {
  name: string;
  checkIns: number;
}

const BarChartExample: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "original">(
    "original"
  );

  const sortedData = useMemo(() => {
    const originalData: DataItem[] = [
      { name: "HR", checkIns: 20 },
      { name: "IT", checkIns: 15 },
      { name: "Finance", checkIns: 30 },
      { name: "Marketing", checkIns: 25 },
      { name: "Sales", checkIns: 35 },
      { name: "Operations", checkIns: 22 },
    ];
    if (sortOrder === "original") return originalData;
    return [...originalData].sort((a, b) =>
      sortOrder === "asc" ? a.checkIns - b.checkIns : b.checkIns - a.checkIns
    );
  }, [sortOrder]);

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#0088FE",
    "#00C49F",
  ];

  const handleMouseEnter = (_: any, index: number) => setActiveIndex(index);
  const handleMouseLeave = () => setActiveIndex(null);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="white" p={3} boxShadow="md" borderRadius="md">
          <Text fontWeight="bold">{label}</Text>
          <Text>{`Check-ins: ${payload[0].value}`}</Text>
          <Text color="gray.500" fontSize="sm">{`${(
            (payload[0].value / totalCheckIns) *
            100
          ).toFixed(2)}% of total`}</Text>
        </Box>
      );
    }
    return null;
  };

  const totalCheckIns = sortedData.reduce(
    (sum, item) => sum + item.checkIns,
    0
  );
  const maxCheckIns = Math.max(...sortedData.map((item) => item.checkIns));
  const CustomYAxis = forwardRef<SVGElement, React.ComponentProps<typeof YAxis>>((props, ref) => (
    <YAxis {...props} ref={ref} />
  ));

  CustomYAxis.displayName = 'CustomYAxis';
  return (
    <VStack spacing={6} align="stretch" w="100%" p={4}>
      <HStack justify="space-between" wrap="wrap">
        <Badge colorScheme="purple" fontSize="lg" p={2}>
          Total Check-ins: {totalCheckIns}
        </Badge>
        <Badge colorScheme="green" fontSize="lg" p={2}>
          Departments: {sortedData.length}
        </Badge>
        <Select
          width="200px"
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "asc" | "desc" | "original")
          }
        >
          <option value="original">Original Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Select>
      </HStack>
      <Box
        h="500px"
        w="100%"
        bg="#f3f4f6"
        borderRadius="lg"
        boxShadow="sm"
        p={4}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
            />
            <YAxis
              allowDecimals={false}
              domain={[0, maxCheckIns + 5]}
              padding={{ top: 20 }}
              width={60}
              tick={{ fill: "#666" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="checkIns"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  opacity={activeIndex === index ? 0.9 : 0.7}
                />
              ))}
              <LabelList dataKey="checkIns" position="top" fill="#666" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  );
};

export default BarChartExample;
