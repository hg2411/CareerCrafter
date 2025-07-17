import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  roomId: String,
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [
    {
      senderId: String,
      text: String,
      createdAt: Date
    }
  ]
}, { timestamps: true });

export const Chat = mongoose.model("Chat", ChatSchema);
