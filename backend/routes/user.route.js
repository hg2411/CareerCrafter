import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  login,
  logout,
  sendOtpForRegistration,
  verifyOtpAndRegister,
  updateProfile,
  getLoggedInUser,
  setPassword,
  setRoleAndPassword,
  forgotPassword,
  verifyForgotPasswordOTP,
  resetPassword
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload, singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// ---------------- Registration Flow ----------------
router.post("/register/send-otp", sendOtpForRegistration);
router.post("/register/verify-otp", singleUpload, verifyOtpAndRegister);

// ---------------- Auth Flow ----------------
router.post("/login", login);
router.get("/logout", logout);
router.get("/auth/me", isAuthenticated, getLoggedInUser);

// ---------------- Profile ----------------
router.put("/profile/update", isAuthenticated, multipleUpload, updateProfile);

// ---------------- Google OAuth ----------------
// 1️⃣ Start Google login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 2️⃣ Google callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  async (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // ✅ If user already has role → redirect
    if (req.user.role) {
      if (req.user.role === "student") {
        return res.redirect(`${process.env.FRONTEND_URL}/`);
      } else if (req.user.role === "recruiter") {
        return res.redirect(`${process.env.FRONTEND_URL}/admin/companies`);
      }
    } else {
      // 🪄 First time login → redirect to first-time-setup page
      return res.redirect(`${process.env.FRONTEND_URL}/first-time-setup`);
    }
  }
);

// 3️⃣ Set role and password (first time after Google login)
router.post("/auth/set-role-and-password", isAuthenticated, setRoleAndPassword);

// Optional: allow normal users to set password later
router.post("/set-password", isAuthenticated, setPassword);
// ✅ Forgot password flow
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-password-otp",verifyForgotPasswordOTP);
router.post("/reset-password", resetPassword);

export default router;
