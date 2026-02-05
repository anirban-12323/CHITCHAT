import express from "express";
import {
  login,
  register,
  getProfile,
  logout,
  getOtherUsers,
} from "../controllers/userController.js";
import {
  isAuthenticated,
  requireAuth,
} from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.get("/get-profile", requireAuth, getProfile);
router.get("/get-other-users", isAuthenticated, getOtherUsers);
export default router;
