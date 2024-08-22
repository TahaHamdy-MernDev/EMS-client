import { IAttendance, IDateParams } from "@/interfaces";
import { asyncWrapper } from "@/utils/asyncWrapper";
import Api from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAttendance = createAsyncThunk<IAttendance, IDateParams>(
  "attendance/getAttendance",
  async (params: IDateParams, thunkAPI) => {
    return await asyncWrapper(async () => {
      const res = await Api.get(`/user/attendance/${params.date}`);
      return res.data.data as IAttendance;
    }, thunkAPI);
  }
);
