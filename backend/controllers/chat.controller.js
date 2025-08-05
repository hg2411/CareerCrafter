// controllers/chat.controller.js
import { Chat } from "../models/chat.model.js";

// ✅ GET /api/v1/chat/:receiverId
export const getChatWithReceiver = async (req, res) => {
  try {
    const senderId = req.id;
    const { receiverId } = req.params;

    const roomId = [senderId, receiverId].sort().join("_");
    const chat = await Chat.findOne({ roomId });

    return res.status(200).json({
      success: true,
      messages: chat?.messages || [],
    });
  } catch (error) {
    console.error("❌ Error fetching chat messages:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ✅ GET /api/v1/chat/recruiter/:recruiterId
export const getRecruiterChats = async (req, res) => {
  const { recruiterId } = req.params;

  try {
    const chats = await Chat.find({ recruiter: recruiterId }) // ✅ FIXED
      .populate("student", "fullname email profilePhoto")     // ✅ FIXED
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("❌ Failed to get recruiter chats:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const saveMessage = async (req, res) => {
  const { senderId, receiverId, text, createdAt, recruiter, student } = req.body;

  if (!senderId || !receiverId || !text || !recruiter || !student) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const roomId = [senderId, receiverId].sort().join("_");

  try {
    let chat = await Chat.findOne({ roomId });

    if (!chat) {
      chat = new Chat({
        roomId,
        recruiter,
        student,
        messages: [],
      });
    }

    chat.messages.push({
      senderId,
      text,
      createdAt: createdAt || new Date(),
    });

    await chat.save();

    return res.status(200).json({ success: true, message: "Message saved" });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
