import { EmployeeDayStatus } from "@/utils/enums";

export interface ILocation {
  type: "Point";
  coordinates: [number, number];
}

export interface IAction {
  type: EmployeeDayStatus;
  time?: string;
  location: ILocation;
  details?: Record<string, any>;
}
export interface IAttendance {
  user: string;
  date: string;
  actions: IAction[];
  status: EmployeeDayStatus;
  totalHours?: number;
  additionalInfo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IDateParams {
  date: string;
}
