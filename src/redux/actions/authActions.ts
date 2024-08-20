import { ILoginFormInputs } from "@/app/page";
import { asyncWrapper } from "@/utils/asyncWrapper";
import Api from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const login = createAsyncThunk(
  "auth/login",
  async (data: ILoginFormInputs, thunkAPI) => {
    return asyncWrapper(async () => {
      const res = await Api.post("/auth/login", data);
      return res.data;
    }, thunkAPI);
  }
);
