import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";

// =========================== APPLY FOR A JOB ===========================
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required.",
                success: false
            });
        }

        // Check if user has already applied
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(409).json({
                message: "You have already applied for this job.",
                success: false
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Create new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        // Add application reference to the job
        if (!job.applications.includes(newApplication._id)) {
            job.applications.push(newApplication._id);
            await job.save();
        }

        const user = await User.findById(userId); // get full name/email
        await Notification.create({
            user: job.created_by, // company user
            message: `New application for "${job.title}" by ${user?.fullname || "a user"}.`,
        });

        // Also send notification to the applicant (student)
        await Notification.create({
        user: userId,
        message: `🎉 You have applied for the job successfully!`,
        type: "success",
        });

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true,
            application: newApplication
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// =========================== GET ALL APPLIED JOBS FOR CURRENT USER ===========================
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } },
                }
            });

        // ✅ Always return success, even if applications are empty
        return res.status(200).json({
            applications, // will be [] if none
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// =========================== ADMIN: GET ALL APPLICANTS FOR A JOB ===========================
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// =========================== ADMIN: UPDATE STATUS OF A JOB APPLICATION ===========================
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required.",
                success: false
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
