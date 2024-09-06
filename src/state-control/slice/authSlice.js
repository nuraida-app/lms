import { createSlice } from "@reduxjs/toolkit";
import { authUser, logoutUser, loadUser } from "../api/authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    isAuthLoading: false,
    isLogout: false,
    logoutLoading: false,
    user: null,
    message: null,
    authError: null,
    logoutError: null,
  },
  reducers: {
    authReset: (state) => {
      state.isAuth = false;
      state.isAuthLoading = false;
      state.isLogout = false;
      state.logoutLoading = false;
      state.user = null;
      state.message = null;
      state.authError = null;
      state.logoutError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isAuthLoading = false;
        state.isLogout = false;
        state.user = action.payload;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuth = false;
        state.logoutLoading = false;
        state.user = null;
        state.message = null;
        state.isLogout = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.isAuthLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isAuthLoading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isAuthLoading = false;
        state.authError = action.payload;
      });
  },
});

export const { authReset } = authSlice.actions;

export default authSlice.reducer;
