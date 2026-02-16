import User from "../models/userModel.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// THIS IS REGISTER CONTROLLER
export const register = asyncHandler(async (req, res, next) => {
  const { fullname, username, password, gender } = req.body;

  if (!fullname || !username || !password || !gender) {
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
    fullname,
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
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
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

  // if (!isValidPassword) {
  //   return next(
  //     new errorHandler("Please enter valid username or password", 400),
  //   );
  // }
  const tokenData = {
    _id: user._id,
  };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    })
    .json({
      success: true,
      responseData: {
        user,
        token,
      },
    });
});

//THIS LOGOUT CONTROLLER
export const logout = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "logout successfull..",
    });
});

//UPDATE PROFILE CONTROLLER
export const updateProfile = asyncHandler(async (req, res, next) => {
  const { fullname, username } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new errorHandler("user not found", 400));
  }

  user.fullname = fullname || user.fullname;
  user.username = username || user.username;

  const updateUser = await user.save();

  res.status(200).json({
    success: true,
    responseData: updateUser,
  });
});

// THIS IS GETPROFILE CONTROLLER

export const getProfile = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Not logged in",
    });
  }
  const userId = req.user._id;

  const profile = await User.findById(userId);
  res.status(200).json({
    success: true,
    responseData: profile,
  });
});

//THIS IS GETOTHERUSER CONTROLLER

export const getOtherUsers = asyncHandler(async (req, res, next) => {
  const otherUsers = await User.find({ _id: { $ne: req.user._id } });
  res.status(200).json({
    success: true,
    responseData: otherUsers,
  });
});
