/**
 ** Start Attendance Interfaces
 */
export interface ILocation {
  type: string;
  coordinates: [number, number];
}

export interface IAction {
  type: string;
  time: string;
  location: Location;
  details?: Record<string, any>;
}

export interface IAttendance {
  user: string;
  date: string;
  actions: IAction[];
  status: string;
  additionalInfo?: string;
}

export interface IAttendanceState {
  data: IAttendance | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
/**
 ** End Attendance Interfaces
 */
