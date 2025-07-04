// controller/notification.controller.js
import { Notification } from "../models/notification.model.js";

// Get all notifications for the user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching notifications" });
  }
};

// Mark a single notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { read: true }); // ✅ use `read`
    res.status(200).json({ success: true, message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error marking notification as read" });
  }
};
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.id }, { read: true }); // ✅ use `read`
    const updatedNotifications = await Notification.find({ user: req.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      updatedNotifications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating notifications" });
  }
};
