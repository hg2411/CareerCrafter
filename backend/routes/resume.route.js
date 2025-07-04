import express from "express";
import multer from "multer";
import { parseResume, parseStoredResume } from "../controllers/resume.controller.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("resume"), parseResume);
router.get("/parse/:studentId", parseStoredResume);

export default router;
