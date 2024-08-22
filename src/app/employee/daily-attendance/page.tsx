import CustomContainer from "@/components/common/CustomContainer";
import DailyAttendance from "@/components/employee/daily-attendance";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "EMS | Daily Attendance",
};
export default function Page() {
  return (
    <CustomContainer>
      <DailyAttendance />
    </CustomContainer>
  );
}
