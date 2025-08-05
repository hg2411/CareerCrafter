import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./passport.js";
import connectDB from "./utils/db.js";
import http from "http";
import { Server } from "socket.io";

// Models
import { Chat } from "./models/chat.model.js";

// Routes
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import notificationRoutes from "./routes/notification.route.js";
import statsRoutes from "./routes/statsRoutes.js";
import chatRoute from "./routes/chat.route.js";

// ✅ Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// ✅ 1. CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // your Vite frontend
  "http://localhost:5174",
  "http://localhost:5175",
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true); // allow requests like Postman
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS Error: Not allowed by CORS for ${origin}`));
  },
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ 2. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ 3. Session Setup (for passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true in production with HTTPS
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// ✅ 4. Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// ✅ 5. API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/chat", chatRoute);

// ✅ 6. Connect to MongoDB
connectDB();

// ✅ 7. Setup Socket Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// ✅ 8. Socket.IO Events
io.on("connection", (socket) => {
  console.log("✅ Socket connected:", socket.id);

  socket.on("joinRoom", ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join("_");
    socket.join(roomId);
    console.log(`✅ User ${senderId} joined room ${roomId}`);
  });

  socket.on("sendMessage", (message) => {
    const roomId = [message.senderId, message.receiverId].sort().join("_");
    io.to(roomId).emit("receiveMessage", message); // Just emit; no DB saving
    console.log(`💬 Sent message to room ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});


// ✅ 9. Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
