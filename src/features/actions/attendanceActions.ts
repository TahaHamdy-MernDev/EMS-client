import Api from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkIn = createAsyncThunk(
  "attendance/checkIn",
  async (
    location: { latitude: number; longitude: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await Api.post("/user/attendance/check-in", location);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkOut = createAsyncThunk(
  "attendance/checkOut",
  async (
    location: { latitude: number; longitude: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await Api.post("/user/attendance/check-out", location);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAttendance = createAsyncThunk(
  "attendance/getAttendance",
  async (params: { date: string }, { rejectWithValue }) => {
    try {
      const response = await Api.get(
        `/user/attendance/${params.date}`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const recordAction = createAsyncThunk(
  "attendance/recordAction",
  async (
    actionData: {
      actionType: string;
      latitude: number;
      longitude: number;
      details?: Record<string, any>;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await Api.post("/user/attendance/record-action", actionData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
