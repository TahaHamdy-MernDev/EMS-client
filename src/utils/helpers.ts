import { IAction } from "@/interfaces";
import { EmployeeDayStatus, Roles } from "./enums";

export function redirectUser(router: any, role: string) {
  switch (role) {
    case Roles.EMPLOYEE:
      router.push("/employee/daily-attendance");
      break;
    case Roles.ADMIN:
      router.push("/admin/dashboard");
      break;
    default:
      router.push("/");
      break;
  }
}

export const getStatusColor = (status: string | undefined): string => {
  switch (status) {
    case EmployeeDayStatus.NOT_STARTED:
      return "gray";
    case EmployeeDayStatus.STARTED:
    case EmployeeDayStatus.CHECKED_IN_NO_CHECKOUT:
      return "blue";
    case EmployeeDayStatus.CHECKED_OUT:
    case EmployeeDayStatus.DAY_COMPLETED:
      return "green";
    case EmployeeDayStatus.OUT_SICK:
    case EmployeeDayStatus.ABSENT:
      return "red";
    case EmployeeDayStatus.EARLY_OUT:
      return "orange";
    case EmployeeDayStatus.TEMPORARILY_UNAVAILABLE:
      return "purple";
    case EmployeeDayStatus.PERMISSION_GRANTED:
      return "teal";
    case EmployeeDayStatus.ON_BREAK:
      return "yellow";
    default:
      return "gray";
  }
};
export const getSpecificAction = ({
  actions,
  typeToFind,
}: {
  actions: IAction[] | undefined;
  typeToFind: EmployeeDayStatus;
}) => {
  return actions?.find((action) => action.type === typeToFind);
};
