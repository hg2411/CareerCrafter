import express from "express";
import { getNotifications, markAsRead, markAllAsRead } from "../controllers/notification.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/get", isAuthenticated, getNotifications);
router.patch("/:id/read", isAuthenticated, markAsRead);
router.patch("/read-all", isAuthenticated, markAllAsRead);

export default router;