import dotenv from "dotenv";
// kD7NT1ntvWWtWiI5
dotenv.config();
import express from "express";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connection1DB.js";
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // important for req.body
//Routes..
app.use("/api/v1/user", userRoute);

//middlewares..
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware);
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
