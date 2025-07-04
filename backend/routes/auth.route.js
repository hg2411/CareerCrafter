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

// 1. Start Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2. Google Callback → ✅ set JWT token cookie
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    req.session.save(() => {
      try {
        if (!req.user) {
          return res.redirect("http://localhost:5173/login"); // fallback
        }

        // ✅ if user hasn't selected role yet → go to select-role page
        if (!req.user.role) {
          return res.redirect("http://localhost:5173/select-role");
        }

        // ✅ generate JWT token
        const token = jwt.sign(
          { userId: req.user._id },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );

        // ✅ set token cookie
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          maxAge: 24 * 60 * 60 * 1000,
        });

        // ✅ redirect based on user role
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
    });
  }
);

// 3. Set role for Google users (first time)
router.post("/set-role", ensureAuthenticated, async (req, res) => {
  try {
    const { role } = req.body;

    let user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      // first time user → create in DB
      user = await User.create({
        fullname: req.user.fullname,
        email: req.user.email,
        googleId: req.user.googleId,
        role,
      });
    } else {
      // user already exists → just set role
      user.role = role;
      await user.save();
    }

    // update passport session
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Session update failed" });
      }

      // ✅ also generate and set JWT token cookie
      const token = jwt.sign(
        { userId: user._id },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
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
// 🔹 JWT Auth Routes
// ------------------------

router.post("/register", singleUpload, register);      // with profile photo
router.post("/login", login);                          // classic login → sets token
router.get("/logout", logout);                          // clears token + session

// ⚠️ Use JWT-based auth for /me and /update-profile
router.get("/me", isAuthenticated, getMe);
router.put("/update-profile", isAuthenticated, singleUpload, updateProfile);

export default router;
