import express from "express";
import passport from "passport";
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

// 1. Start Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2. Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    req.session.save(() => {
      if (!req.user.role) {
        return res.redirect("http://localhost:5173/select-role");
      }
      if (req.user.role === "student") {
        return res.redirect("http://localhost:5173/");
      } else if (req.user.role === "recruiter") {
        return res.redirect("http://localhost:5173/admin/companies");
      } else {
        return res.redirect("http://localhost:5173/");
      }
    });
  }
);

// 3. Set role for Google users
router.post("/set-role", ensureAuthenticated, async (req, res) => {
  try {
    const { role } = req.body;
    let user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      user = await User.create({
        fullname: req.user.fullname,
        email: req.user.email,
        googleId: req.user.googleId,
        role,
      });
    } else {
      user.role = role;
      await user.save();
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Session update failed" });
      }
      return res.status(200).json({ success: true, user });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

// ------------------------
// 🔹 JWT Auth Routes
// ------------------------

router.post("/register", singleUpload, register); // with photo
router.post("/login", login);
router.get("/logout", logout); // Handles both session & token logout

// ⚠️ Use JWT-based auth for /me and update
router.get("/me", isAuthenticated, getMe);
router.put("/update-profile", isAuthenticated, singleUpload, updateProfile);

export default router;
