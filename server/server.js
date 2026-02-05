import dotenv from "dotenv";
// kD7NT1ntvWWtWiI5
dotenv.config();
import express from "express";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connection1DB.js";
import cors from "cors";
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,
  }),
);

app.use(express.json()); // important for req.body
app.use(cookieParser());
const PORT = process.env.PORT;
//Routes..
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/user", userRoute);

//middlewares..
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
