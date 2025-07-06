// routes/notification.route.js
import express from "express";
import { getNotifications, markAsRead } from "../controllers/notification.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/get", isAuthenticated, getNotifications);
router.put("/mark-as-read/:id", isAuthenticated, markAsRead);

export default router;