"use client";
import React from "react";
import { Box, Heading, Grid, Text, Flex, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaUsers, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import dynamic from "next/dynamic";


const AttendanceLineChart = dynamic(() => import("./Charts/AttendanceTrend"),{ ssr: false });
const DailyAttendanceLineChart = dynamic(() => import("./Charts/DailyAttendance"), { ssr: false });
const AreaChartExample = dynamic(() => import("./Charts/RadarChart"), { ssr: false });
const PieChartExample = dynamic(() => import("./Charts/PieChart"), { ssr: false });
const BarChartExample = dynamic(() => import("./Charts/BarChart"), { ssr: false });
const LastUpdated = dynamic(() => import('./LastUpdated'), { ssr: false });
const MetricCard: React.FC<{ title: string; value: string | number; icon: React.ElementType }> = ({ title, value, icon }) => (
  <Box bg="white" p="6" borderRadius="lg" shadow="md">
    <VStack align="start" spacing={3}>
      <HStack spacing={3}>
        <Icon as={icon} boxSize={6} color="blue.500" />
        <Heading size="md">{title}</Heading>
      </HStack>
      <Text fontSize="3xl" fontWeight="bold">{value}</Text>
    </VStack>
  </Box>
);

const Dashboard: React.FC = () => {
  return (
    <Box p="10" minHeight="100vh" rounded={'md'}>
      <Flex justify="space-between" align="center" mb="6">
        <Heading color={'white'}>Dashboard</Heading>
        <LastUpdated />
      </Flex>

      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="6" mb="8">
        <MetricCard title="Total Employees" value={123} icon={FaUsers} />
        <MetricCard title="Upcoming Events" value={2} icon={FaCalendarAlt} />
        <MetricCard title="Recent Activities" value={5} icon={FaClipboardList} />
      </Grid>

      <Grid templateColumns="repeat(auto-fit, minmax(450px, 1fr))" gap="8">
        <Box bg="white" p="6" borderRadius="lg" shadow="md">
          <Heading size="md" mb="4">Attendance Trend</Heading>
          <AttendanceLineChart />
        </Box>

        <Box bg="white" p="6" borderRadius="lg" shadow="md">
          <Heading size="md" mb="4">Daily Attendance</Heading>
          <DailyAttendanceLineChart />
        </Box>

        <Box bg="white" p="6" borderRadius="lg" shadow="md">
          <Heading size="md" mb="4">Department Performance</Heading>
          <AreaChartExample />
        </Box>

        <Box bg="white" p="6" borderRadius="lg" shadow="md">
          <Heading size="md" mb="4">Attendance Distribution</Heading>
          <PieChartExample />
        </Box>

        <Box bg="white" p="6" borderRadius="lg" shadow="md">
          <Heading size="md" mb="4">Department Comparison</Heading>
          <BarChartExample />
        </Box>
      </Grid>
    </Box>
  );
};

export default Dashboard;