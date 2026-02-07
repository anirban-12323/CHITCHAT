import { createSlice } from "@reduxjs/toolkit";
import { sendMessageThunk, getMessageThunk } from "./messageThunk";

export const messageSlice = createSlice({
  name: "messages",
  initialState: {
    screenLoading: true,
    messages: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // SEND MESSAGE
    builder.addCase(sendMessageThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.messages = [...state.messages, action.payload?.responseData];
      state.screenLoading = false;
    });
    builder.addCase(sendMessageThunk.rejected, (state) => {
      state.screenLoading = false;
    });

    // GET MESSAGE
    builder.addCase(getMessageThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.messages = action.payload?.responseData?.messages;
      state.screenLoading = false;
    });
    builder.addCase(getMessageThunk.rejected, (state) => {
      state.screenLoading = false;
    });
  },
});
export const {} = messageSlice.actions;
export default messageSlice.reducer;
