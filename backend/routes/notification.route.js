import express from "express";
import { getNotifications, markAsRead, markAllAsRead } from "../controllers/notification.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { Notification } from "../models/notification.model.js";

const router = express.Router();

router.get("/get", isAuthenticated, getNotifications);
router.put("/mark-as-read/:id", isAuthenticated, markAsRead);
router.put("/mark-all-as-read", isAuthenticated, markAllAsRead);

// New: create test notification
router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const notification = await Notification.create({
      user: req.id,
      message: "🎉 This is a test notification!"
    });
    res.json({ success: true, notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create notification." });
  }
});

export default router;
