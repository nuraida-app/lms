import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// Async thunk for authentication
export const authUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/login", userData, config);
      return data.user;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/logout", config);
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for loading user
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/auth/load", config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
