import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat.route.js";
import session from "express-session";
import passport from "./passport.js"; 
import connectDB from "./utils/db.js";
import http from "http";
import { Server } from "socket.io";

// ✅ import Chat model
import { Chat } from "./models/chat.model.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import notificationRoutes from "./routes/notification.route.js";
import statsRoutes from "./routes/statsRoutes.js";

dotenv.config();

const app = express();

// ✅ 1. CORS first
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: Access denied for origin ${origin}`), false);
  },
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ 2. General middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ 3. Session (needed for passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,            // true if using HTTPS in prod
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ✅ 4. Passport init
app.use(passport.initialize());
app.use(passport.session());

// ✅ 5. Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/chat", chatRoute);
// ✅ 6. Connect DB
connectDB();

// ✅ 7. Create HTTP server & attach socket.io
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// ✅ 8. Socket.io logic
io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("join", ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join("_");
    socket.join(roomId);
    console.log(`✅ User ${senderId} joined room: ${roomId}`);
  });

  socket.on("sendMessage", async (message) => {
    const roomId = [message.senderId, message.receiverId].sort().join("_");

    // emit message to room
    io.to(roomId).emit("receiveMessage", message);

    try {
      // ✅ save to DB
      let chat = await Chat.findOne({ roomId });
      if (!chat) {
        chat = await Chat.create({ roomId, messages: [message] });
      } else {
        chat.messages.push(message);
        await chat.save();
      }
    } catch (err) {
      console.error("❌ Failed to save message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ✅ 9. Start server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
