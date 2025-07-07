import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  sendOtpForRegistration,      // ✅ add this
  verifyOtpAndRegister        // ✅ add this
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload, singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Send OTP before registration
router.post("/send-otp", sendOtpForRegistration);           // ✅ new route

// Verify OTP & register
router.post("/verify-otp-register", singleUpload, verifyOtpAndRegister);
  // ✅ new route

// Register with file upload (e.g., for Google signup etc.)
router.post("/register", singleUpload, register);

// Login
router.post("/login", login);

// Logout
router.get("/logout", logout);

// Update profile
router.put("/profile/update", isAuthenticated, multipleUpload, updateProfile);

export default router;
