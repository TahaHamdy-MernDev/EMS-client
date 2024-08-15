import React, { Suspense } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Container, Flex, calc, Progress } from "@chakra-ui/react";

import CurrentDayAttendance from "@/components/admin/Employees/CurrentDayAttendance";

const ProfilePage: React.FC = () => {
  return (
    <Container minH={calc.subtract('100svh', '4rem')} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <CurrentDayAttendance employeeId={""} />
    </Container>
  );
};



export default ProfilePage;
