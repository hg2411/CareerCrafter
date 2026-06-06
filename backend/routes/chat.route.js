import express from "express";
import {
  getChatWithReceiver,
  getRecruiterChats, 
  getStudentChats
} from "../controllers/chat.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { saveMessage } from "../controllers/chat.controller.js";
const router = express.Router();

// Existing: get chat with a single receiver (student)
router.get("/student/:studentId", isAuthenticated, getStudentChats);


router.get("/:receiverId", isAuthenticated, getChatWithReceiver);

//New: get all chats where recruiter is the recruiterId
router.get("/recruiter/:recruiterId", isAuthenticated, getRecruiterChats);
router.post("/message", isAuthenticated, saveMessage);
export default router;
