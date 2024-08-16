import { IAttendanceState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import {
  checkIn,
  checkOut,
  getAttendance,
  recordAction,
} from "../actions/attendanceActions";
const initialState: IAttendanceState = {
  data: null,
  status: "idle",
  error: null,
};
const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    resetAttendanceState: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(checkOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(getAttendance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(recordAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(recordAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(recordAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetAttendanceState } = attendanceSlice.actions;

export default attendanceSlice.reducer;
