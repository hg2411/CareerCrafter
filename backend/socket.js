// backend/socket.js
import { Server } from "socket.io";
import { Chat } from "./models/chat.model.js";

export const setupSocket = (server) => {
  const originUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
  const io = new Server(server, {
    cors: {
      origin: originUrl, // frontend URL
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 New client connected");

    socket.on("join", ({ senderId, receiverId }) => {
      const roomId = [senderId, receiverId].sort().join("_");
      socket.join(roomId);
      console.log(`User ${senderId} joined room ${roomId}`);
    });

    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId, text, createdAt } = data;
      const roomId = [senderId, receiverId].sort().join("_");

      try {
        let chat = await Chat.findOne({ roomId });

        if (!chat) {
          chat = new Chat({
            roomId,
            recruiterId: senderId, // You can adjust based on roles
            studentId: receiverId,
            messages: [],
          });
        }

        chat.messages.push({ senderId, text, createdAt });
        await chat.save();

        io.to(roomId).emit("receiveMessage", { senderId, text, createdAt });
      } catch (error) {
        console.error("❌ Error saving chat message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected");
    });
  });
};
