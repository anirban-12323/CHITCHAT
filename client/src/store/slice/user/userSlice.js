import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserProfileThunk,
  getOtherUserThunk,
} from "./userThunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    otherUser: null,
    selectedUser: null,
    screenLoading: true,
    userProfile: null,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginUserThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.screenLoading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.screenLoading = false;
    });

    // REGISTER
    builder.addCase(registerUserThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.user;
      state.screenLoading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.screenLoading = false;
    });

    // LOGOUT
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.screenLoading = false;
      state.userProfile = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.screenLoading = false;
    });

    // GET PROFILE
    builder.addCase(getUserProfileThunk.pending, (state) => {
      console.log("PROFILE → pending");
      state.screenLoading = true;
    });

    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      console.log("PROFILE → fulfilled", action.payload);

      state.isAuthenticated = true;
      state.userProfile = action.payload?.responseData; // 🔥 THIS WAS MISSING
      state.screenLoading = false;
    });

    builder.addCase(getUserProfileThunk.rejected, (state) => {
      console.log("PROFILE → REJECTED");

      state.screenLoading = false;
      state.isAuthenticated = false;
      state.userProfile = null;
    });

    // GET OTHER USER
    builder.addCase(getOtherUserThunk.pending, (state) => {
      console.log("OTHER USER → pending");
      state.screenLoading = true;
    });

    builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
      console.log("OTHER USER → fulfilled", action.payload);

      state.otherUser = action.payload?.responseData; // 🔥 THIS WAS MISSING
      state.screenLoading = false;
    });

    builder.addCase(getOtherUserThunk.rejected, (state) => {
      console.log("OTHER USER → REJECTED");

      state.screenLoading = false;
    });
  },
});
export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
