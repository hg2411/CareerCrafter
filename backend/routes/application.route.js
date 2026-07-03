import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus, withdrawApplication } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
router.route("/withdraw/:id").delete(isAuthenticated, withdrawApplication);

export default router;