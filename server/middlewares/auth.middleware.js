import { asyncHandler } from "../utilities/asyncHandler.utility";
import { errorHandler } from "../utilities/errorHandler.utility";

const isAuthenticated = asyncHandler(async (req, resizeBy, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new errorHandler("Invalid token", 400));
  }
});
