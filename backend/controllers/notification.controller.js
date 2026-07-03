// controllers/notification.controller.js
import { Notification } from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.id;
    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch notifications." });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.status(200).json({ success: true, message: "Marked as read." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating notification." });
  }
};
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.id;
    await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating notifications." });
  }
};
