import { IAttendance } from "@/interfaces";
import { Status } from "@/utils/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAttendance } from "../actions/attendanceActions";
export interface IAttendanceState {
  attendance: IAttendance | null;
  getAttendanceStatus: Status;
  getAttendanceLoading: boolean;
  checkInStatus: Status;
  checkOutStatus: Status;
  error: string | null;
}
const initialState: IAttendanceState = {
  attendance: null,
  getAttendanceStatus: Status.IDLE,
  getAttendanceLoading: true,
  checkInStatus: Status.IDLE,
  checkOutStatus: Status.IDLE,
  error: null,
};
const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAttendance.pending, (state) => {
        state.getAttendanceStatus = Status.LOADING;
        state.error = null;
      })
      .addCase(
        getAttendance.fulfilled,
        (state, action: PayloadAction<IAttendance>) => {
          state.getAttendanceStatus = Status.IDLE;
          state.attendance = action.payload;
          state.error = null;
          state.getAttendanceLoading = false;
        }
      )
      .addCase(getAttendance.rejected, (state, { payload }) => {
        state.getAttendanceStatus = Status.FAILED;
        state.error = payload as string;
        state.getAttendanceLoading = false;
      });
  },
});

const attendanceReducer = attendanceSlice.reducer;
export default attendanceReducer;
