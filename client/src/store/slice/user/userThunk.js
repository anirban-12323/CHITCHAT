import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUserThunk = createAsyncThunk("users/loginUser", async () => {
  console.log("hello");
});
