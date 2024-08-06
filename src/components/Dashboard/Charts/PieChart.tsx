"use client";
import React, { useState } from "react";
import { Box, Text, VStack, HStack, Badge } from "@chakra-ui/react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Sector
} from "recharts";

interface DataItem {
  name: string;
  value: number;
}

const PieChartExample: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const data: DataItem[] = [
    { name: "Meeting", value: 400 },
    { name: "Sick Leave", value: 300 },
    { name: "Late Arrival", value: 300 },
    { name: "Other", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Value ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const average = total / data.length;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <Box
          bg="white"
          p={2}
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
        >
          <Text fontWeight="bold">{item.name}</Text>
          <Text>Value: {item.value}</Text>
          <Text>Percentage: {((item.value / total) * 100).toFixed(2)}%</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between">
        <Badge colorScheme="blue" fontSize="md">
          Total: {total}
        </Badge>
        <Badge colorScheme="green" fontSize="md">
          Average: {average.toFixed(2)}
        </Badge>
      </HStack>
      <Box
        bg="#f3f4f6"
        display="flex"
        justifyContent="center"
        width="100%"
        height="400px"
        rounded="md"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </VStack>
  );
};

export default PieChartExample;
