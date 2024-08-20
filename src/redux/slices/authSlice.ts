import { Status } from "@/utils/enums";
import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/authActions";

const initialState = {
  isAuthenticated: false,
  loginStatus: Status.IDLE,
  user: null,
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
    builder.addCase(login.fulfilled, (state) => {
      state.loginStatus = Status.SUCCEEDED;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      console.log(payload);
      state.loginStatus = Status.FAILED;
    });
  },
});
const authReducer = authSlice.reducer;
export default authReducer;
