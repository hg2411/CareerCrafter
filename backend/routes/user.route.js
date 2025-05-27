import express from "express";
import { register, updateProfile } from "../controllers/user.controller.js";
const router = express.Router();

router.route("register").post(register);
router.route("login").post(login);
router.route("/profile/update").post(updateProfile);
