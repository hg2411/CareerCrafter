// routes/user.routes.js
import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // ✅// Named export
import { multipleUpload } from "../middlewares/multer.js";
import { singleUpload } from "../middlewares/multer.js"; // ✅// Named export


const router = express.Router();

// Register with file upload (e.g., profile picture or resume)
router.post("/register", singleUpload, register);

// Login
router.post("/login", login);

// Logout
router.get("/logout", logout);

// Update profile (authenticated + file upload)
router.put("/profile/update", isAuthenticated, multipleUpload, updateProfile);

export default router;
