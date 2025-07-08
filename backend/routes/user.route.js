import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  login,
  logout,
  sendOtpForRegistration,
  verifyOtpAndRegister,
  updateProfile
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload, singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// 📩 Send OTP before registration
router.post("/send-otp", sendOtpForRegistration);

// 📝 Verify OTP & register (manual register with OTP)
router.post("/verify-otp-register", singleUpload, verifyOtpAndRegister);

// 🔐 Manual login
router.post("/login", login);

// 🚪 Logout
router.get("/logout", logout);

// ✏️ Update profile
router.put("/profile/update", isAuthenticated, multipleUpload, updateProfile);

// 🔑 Google OAuth login (redirects to Google)
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// ✅ Google OAuth callback → create same JWT & set cookie
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  async (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    }).redirect(process.env.FRONTEND_URL); // ✅ redirect to your frontend
  }
);

export default router;
