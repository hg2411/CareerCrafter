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
  setPassword
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload, singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Registration Flow
router.post("/register/send-otp", sendOtpForRegistration);
router.post("/register/verify-otp", singleUpload, verifyOtpAndRegister);

// Auth Flow
router.post("/login", login);
router.get("/logout", logout);
router.get("/auth/me", isAuthenticated, getLoggedInUser);

// Profile
router.put("/profile/update", isAuthenticated, multipleUpload, updateProfile);

// Google OAuth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  async (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .redirect(process.env.FRONTEND_URL);
  }
);
console.log("✅ Routes loaded");
// routes/user.route.js
router.post("/set-password", isAuthenticated, setPassword);
export default router;
