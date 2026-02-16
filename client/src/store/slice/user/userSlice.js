import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserProfileThunk,
  getOtherUserThunk,
  updateProfileThunk,
} from "./userThunk";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    otherUser: null,
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
    screenLoading: true,
    userProfile: null,
    activeScreen: "chat",
  },
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    },
    setActiveScreen: (state, action) => {
      state.activeScreen = action.payload;
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
      ((state.selectedUser = null), (state.otherUser = null));
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.screenLoading = false;
    });

    // GET PROFILE
    builder.addCase(getUserProfileThunk.pending, (state) => {
      state.screenLoading = true;
    });

    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userProfile = action.payload?.responseData; // 🔥 THIS WAS MISSING
      state.screenLoading = false;
    });

    builder.addCase(getUserProfileThunk.rejected, (state) => {
      state.screenLoading = false;
      state.isAuthenticated = false;
      state.userProfile = null;
    });

    // GET OTHER USER
    builder.addCase(getOtherUserThunk.pending, (state) => {
      state.screenLoading = true;
    });

    builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
      state.otherUser = action.payload?.responseData; // 🔥 THIS WAS MISSING
      state.screenLoading = false;
    });

    builder.addCase(getOtherUserThunk.rejected, (state) => {
      state.screenLoading = false;
    });

    //UPDATE PROFILE
    builder.addCase(updateProfileThunk.pending, (state, action) => {
      state.screenLoading = true;
    });

    builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      console.log(action.payload?.responseData);
      state.userProfile = action.payload?.responseData;
    });
    builder.addCase(updateProfileThunk.rejected, (state, action) => {
      state.screenLoading = true;
    });
  },
});
export const { setSelectedUser, setActiveScreen } = userSlice.actions;
export default userSlice.reducer;
