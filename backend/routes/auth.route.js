import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
} from "../controllers/user.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// ------------------------
// 🔹 Google OAuth Routes
// ------------------------

// 1️⃣ Start Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2️⃣ Google callback → find/create user & issue JWT
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect("http://localhost:5173/login");
      }

      // If user has no role → redirect to frontend role selection
      if (!req.user.role) {
        return res.redirect("http://localhost:5173/select-role");
      }

      // ✅ Generate JWT
      const token = jwt.sign(
        { userId: req.user._id },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );

      // ✅ Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Redirect based on role
      if (req.user.role === "student") {
        return res.redirect("http://localhost:5173/");
      } else if (req.user.role === "recruiter") {
        return res.redirect("http://localhost:5173/admin/companies");
      } else {
        return res.redirect("http://localhost:5173/");
      }

    } catch (err) {
      console.error("Google callback error:", err);
      return res.redirect("http://localhost:5173/login");
    }
  }
);

// 3️⃣ Set role after Google login (first time)
router.post("/set-role", async (req, res) => {
  try {
    const { googleId, role } = req.body;

    let user = await User.findOne({ googleId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.role = role;
    await user.save();

    // ✅ Issue new JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Set-role error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// ------------------------
// 🔹 Classic JWT Auth Routes
// ------------------------

router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);

// ⚠️ Protected routes: need JWT in cookie
router.get("/me", isAuthenticated, getMe);
router.put("/update-profile", isAuthenticated, singleUpload, updateProfile);

export default router;
