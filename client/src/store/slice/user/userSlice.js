import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./userThunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    Login: () => {
      console.log("hello login");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      console.log("fullfiled");
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      console.log("rejected");
    });
  },
});
export const { Login } = userSlice.actions;
export default userSlice.reducer;
