import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../components/utilities/axiosInstance";
import { toast } from "react-hot-toast";
//loginUser Thunk
export const sendMessageThunk = createAsyncThunk(
  "messages/send",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/message/send/${receiverId}`, {
        message,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;

      return rejectWithValue(errorOutput);
    }
  },
);

export const getMessageThunk = createAsyncThunk(
  "messages/get",
  async ({ otherParticipantId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/message/get-messages/${otherParticipantId}`,
      );

      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.message;

      return rejectWithValue(errorOutput);
    }
  },
);
