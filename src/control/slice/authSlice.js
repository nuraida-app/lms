import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice = createSlice({
  name: "otorisasi",
  initialState: {
    user: null,
    signIn: false,
    isLoading: false, // Tambahkan properti isLoading ke state
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
      state.signIn = true;
      state.isLoading = false; // Set isLoading ke false setelah login berhasil
    },
    setLogout: (state) => {
      state.user = null;
      state.signIn = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload; // Atur loading status
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchPending, // Saat login dimulai
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled, // Saat login berhasil
        (state, { payload }) => {
          state.user = payload;
          state.signIn = true;
          state.isLoading = false; // Set isLoading ke false
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchRejected, // Saat login gagal
        (state) => {
          state.isLoading = false; // Set isLoading ke false
        }
      )
      .addMatcher(
        authApi.endpoints.load.matchFulfilled, // Saat load data berhasil
        (state, { payload }) => {
          state.user = payload;
          state.signIn = true;
        }
      );
  },
});

export const { setLogin, setLogout, setLoading } = authSlice.actions;
export default authSlice.reducer;
