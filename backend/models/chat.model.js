import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  roomId: String,
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional improvement
      text: String,
      createdAt: Date
    }
  ]
}, { timestamps: true });

export const Chat = mongoose.model("Chat", ChatSchema);
