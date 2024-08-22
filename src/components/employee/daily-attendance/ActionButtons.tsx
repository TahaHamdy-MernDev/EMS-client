import { useAppSelector } from "@/redux/reduxHooks";
import { EmployeeDayStatus, Status } from "@/utils/enums";
import { getUserLocation } from "@/utils/userLocation";
import { Button, HStack } from "@chakra-ui/react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export default function ActionButtons() {
  const handleCheckIn = async () => {
    const location = await getUserLocation();
    console.log(location);
  };
  const handleCheckOut = async () => {};
  const { attendance, checkInStatus, checkOutStatus } = useAppSelector(
    (state) => state.attendance
  );
  const status =
    attendance?.status ?? EmployeeDayStatus.NOT_STARTED.replace(/_/g, " ");
  const isCheckInDisabled =
    status === EmployeeDayStatus.STARTED ||
    status === EmployeeDayStatus.CHECKED_OUT;
  return (
    <HStack
      w={"full"}
      justify="space-between"
      wrap={{ base: "wrap", sm: "nowrap", md: "nowrap" }}
    >
      <Button
        leftIcon={<FaSignInAlt fill="text.white" />}
        size={{ base: "md", md: "lg" }}
        variant={"checkIn"}
        onClick={handleCheckIn}
        isLoading={checkInStatus === Status.LOADING}
        isDisabled={isCheckInDisabled}
      >
        Check In
      </Button>
      <Button
        leftIcon={<FaSignOutAlt fill="text.white" />}
        size={{ base: "md", md: "lg" }}
        variant={"checkOut"}
        onClick={handleCheckOut}
        isLoading={checkOutStatus === Status.LOADING}
        isDisabled={attendance?.status == EmployeeDayStatus.CHECKED_OUT}
      >
        Check Out
      </Button>
    </HStack>
  );
}
