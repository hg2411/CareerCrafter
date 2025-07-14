import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/auth/set-role-and-password", isAuthenticated, async (req, res) => {
  try {
    const { role, password } = req.body;

    if (!role || !password) {
      return res.status(400).json({ success: false, message: "Role and password required" });
    }

    const user = await User.findById(req.id);  // `req.id` comes from isAuthenticated

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.role) {
      return res.status(400).json({ success: false, message: "Role already set" });
    }

    user.role = role;
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ success: true, user });
  } catch (err) {
    console.error("set-role-and-password error:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

export default router;
