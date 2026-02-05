import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../components/utilities/axiosInstance";
import { toast } from "react-hot-toast";
//loginUser Thunk
export const loginUserThunk = createAsyncThunk(
  "users/loginUser",
  async ({ username, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      toast.success("login successfull");

      // ✅ Fetch profile immediately after successful login
      // This ensures we have the complete user data
      await dispatch(getUserProfileThunk());
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput);

      return rejectWithValue(errorOutput);
    }
  },
);
//registerUser Thunk
export const registerUserThunk = createAsyncThunk(
  "users/registerUser",
  async ({ fullname, username, password, gender }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", {
        fullname,
        username,
        password,
        gender,
      });
      toast.success("account created successfully");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput);

      return rejectWithValue(errorOutput);
    }
  },
);

//logoutUser Thunk

export const logoutUserThunk = createAsyncThunk(
  "users/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success("logout successfully !! ");
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;
      toast.error(errorOutput);

      return rejectWithValue(errorOutput);
    }
  },
);

//getUserProfile Thunk

export const getUserProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🚀 GET PROFILE - Starting API call...");
      const response = await axiosInstance.get("/user/get-profile");
      console.log("✅ GET PROFILE - Response received:", response);
      console.log("📦 GET PROFILE - Response data:", response.data);
      console.log("👤 GET PROFILE - User data:", response.data.responseData);
      return response.data;
    } catch (error) {
      console.error(error);
      // const errorOutput = error?.response?.data?.errMessage;
      //toast.error(errorOutput);

      console.error("❌ GET PROFILE - Error caught:", error);
      console.error("❌ GET PROFILE - Error response:", error?.response);
      console.error("❌ GET PROFILE - Error data:", error?.response?.data);
      console.error("❌ GET PROFILE - Error status:", error?.response?.status);
      return rejectWithValue(null);
    }
  },
);
