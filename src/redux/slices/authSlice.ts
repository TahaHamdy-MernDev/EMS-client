import { Status } from "@/utils/enums";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../actions/authActions";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "@/utils/cookies";

export interface AuthState {
  isAuthenticated: boolean;
  loginStatus: Status;
  userRole: string;
  error: string | null;
}

const { token, decodedToken } = getAccessToken();

const initialState: AuthState = {
  isAuthenticated: !!token,
  loginStatus: Status.IDLE,
  userRole: decodedToken?.role ?? "",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.loginStatus = Status.LOADING;
    });
    builder.addCase(
      login.fulfilled,
      (
        state,
        {
          payload,
        }: PayloadAction<{
          data: { refreshToken: string; accessToken: string; role: string };
        }>
      ) => {
        state.loginStatus = Status.SUCCEEDED;
        state.userRole = payload.data.role;
        state.isAuthenticated = true;
        setAccessToken(payload.data.accessToken);
        setRefreshToken(payload.data.refreshToken);
      }
    );
    builder.addCase(login.rejected, (state, { payload }) => {
      console.error("Login failed:", payload);
      state.loginStatus = Status.FAILED;
      state.error = payload as string;
    });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
