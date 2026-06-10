import express from "express";
import multer from "multer";
import  isAuthenticated  from "../middlewares/isAuthenticated.js";
import {
  analyzeProfile,
  getReport,
  getAllReports,
} from "../controllers/ai.controller.js";

const router = express.Router();

// Multer: memory storage — PDF is NOT saved to disk or Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed."), false);
    }
  },
});

router.post(
  "/analyze",
  isAuthenticated,
  upload.single("resume"),
  analyzeProfile
);
router.get("/reports", isAuthenticated, getAllReports);
router.get("/report/:id", isAuthenticated, getReport);

export default router;