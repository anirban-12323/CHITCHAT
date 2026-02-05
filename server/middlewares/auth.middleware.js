import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import jwt from "jsonwebtoken";

// export const isAuthenticated = asyncHandler(async (req, res, next) => {
//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return next(new errorHandler("Invalid token", 400));
//   }

//   const tokenData = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = tokenData;

//   next();
// });
export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(); // allow logout
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // ignore invalid token on logout
  }

  next();
});
