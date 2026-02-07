import express from "express";

import {
  isAuthenticated,
  requireAuth,
} from "../middlewares/auth.middleware.js";
import { sendMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();
router.post("/send/:receiverId", requireAuth, sendMessage);
router.get("/get-messages/:otherParticipantId", requireAuth, getMessages);

export default router;
