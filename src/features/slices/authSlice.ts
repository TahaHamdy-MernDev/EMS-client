import Api from "@/services/api";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { getAccessToken, setAccessToken } from "@/utils/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

export interface AuthState {
  token: string | null;
  accessToken: string | null | any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  accessToken: null ,
  status: "idle",
  error: null,
};

export interface LoginData {
  phone: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: LoginData, thunkAPI) => {
    return asyncWrapper(async () => {
      const response = await Api.post("/auth/login", data);
      setAccessToken(response.data.data.accessToken);
      return response.data.data;
    }, thunkAPI);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("action.payload", action.payload);
        state.accessToken = action.payload.accessToken;
        toast({
          variant: "top-accent",
          title: "Login Successfully",
          description: "you will be redirected after 1s",
          status: "success",
          isClosable: true,
          duration: 1000,
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        toast({
          variant: "top-accent",
          isClosable: true,
          duration: 4000,
          title: "Login Error",
          description: (action.payload as string) ?? "An error occurred",
          status: "error",
        });
      });
  },
});

export default authSlice.reducer;
