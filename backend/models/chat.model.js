import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  roomId: { type: String, required: true }, // e.g., sorted IDs: senderId_receiverId
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    }
  ]
}, { timestamps: true });

export const Chat = mongoose.model("Chat", chatSchema);
