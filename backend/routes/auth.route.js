import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";
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

// 2️⃣ Google callback → set JWT cookie
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect("http://localhost:5173/login");
      }

      // If user has no role → redirect to role selection page
      if (!req.user.role) {
        return res.redirect("http://localhost:5173/select-role");
      }

      // ✅ generate JWT token
      const token = jwt.sign(
        { userId: req.user._id },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );

      // ✅ set cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax", // better for frontend cross-origin
        secure: process.env.NODE_ENV === "production", // true only in prod
        maxAge: 24 * 60 * 60 * 1000,
      });

      // redirect user based on role
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
router.post("/set-role", ensureAuthenticated, async (req, res) => {
  try {
    const { role } = req.body;

    let user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      // first time Google user → create user
      user = await User.create({
        fullname: req.user.fullname,
        email: req.user.email,
        googleId: req.user.googleId,
        role,
      });
    } else {
      // user exists → just set role
      user.role = role;
      await user.save();
    }

    // update passport session
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Session update failed" });
      }

      // also set JWT token
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
    });
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

// ⚠️ Protected: need token in cookie
router.get("/me", isAuthenticated, getMe);
router.put("/update-profile", isAuthenticated, singleUpload, updateProfile);

export default router;
