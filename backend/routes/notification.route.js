// routes/notification.route.js
import express from "express";
import { getNotifications, markAllAsRead, markAsRead } from "../controllers/notification.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/get", isAuthenticated, getNotifications);
router.put("/mark-as-read/:id", isAuthenticated, markAsRead);
router.put("/mark-all-as-read", isAuthenticated, markAllAsRead);

export default router;