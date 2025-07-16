// controllers/chat.controller.js
import { Chat } from "../models/chat.model.js";

// GET /api/v1/chat/:receiverId
export const getChatWithReceiver = async (req, res) => {
  try {
    const senderId = req.id;  // logged in user ID from isAuthenticated middleware
    const { receiverId } = req.params;

    const roomId = [senderId, receiverId].sort().join("_");
    const chat = await Chat.findOne({ roomId });

    return res.status(200).json({
      success: true,
      messages: chat?.messages || []
    });
  } catch (error) {
    console.error("❌ Error fetching chat messages:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};
export const getRecruiterChats = async (req, res) => {
  const { recruiterId } = req.params;

  try {
    const chats = await Chat.find({ recruiterId })
      .populate("studentId", "fullname email profilePhoto") // populate student info
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("❌ Failed to get recruiter chats:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

