import User from "../models/userModel.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// THIS IS REGISTER CONTROLLER
export const register = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, gender } = req.body;

  if (!fullName || !username || !password || !gender) {
    return next(new errorHandler("All fields are required", 400));
  }

  const user = await User.findOne({ username });

  if (user) {
    return next(new errorHandler("User already exist", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarType = gender === "male" ? "boy" : "girl";

  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;

  const newUser = await User.create({
    fullName,
    username,
    password: hashedPassword,
    gender,
    avatar,
  });
  const tokenData = {
    _id: newUser._id,
  };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  res
    .status(200)
    .cookie("token", {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: false,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        newUser,
        token,
      },
    });
});

// THIS IS LOGIN CONTROLLER
export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      new errorHandler("Please enter valid username or password", 400),
    );
  }

  const user = await User.findOne({ username });

  if (!user) {
    return next(
      new errorHandler("Please enter valid username or password", 400),
    );
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return next(
      new errorHandler("Please enter valid username or password", 400),
    );
  }
  const tokenData = {
    _id: user._id,
  };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res
    .status(200)
    .cookie("token", {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: false,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: {
        user,
        token,
      },
    });
});
