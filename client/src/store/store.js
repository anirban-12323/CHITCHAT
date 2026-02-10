import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/userSlice";
import messageReducer from "./slice/message/messageSlice";
import socketReducer from "./slice/socket/socketSilice";

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"],
      },
    }),
});
