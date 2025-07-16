import express from "express";
import {
  getChatWithReceiver,
  getRecruiterChats // <-- new controller
} from "../controllers/chat.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Existing: get chat with a single receiver (student)
router.get("/:receiverId", isAuthenticated, getChatWithReceiver);

// ✅ New: get all chats where recruiter is the recruiterId
router.get("/recruiter/:recruiterId", isAuthenticated, getRecruiterChats);

export default router;
