import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";
import sendMail from "../utils/sendMail.js";

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

    const application = await Application.findById(applicationId)
      .populate('applicant')
      .populate({
        path: 'job',
        populate: {
          path: 'company'
        }
      });

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false
      });
    }

    const oldStatus = application.status;
    const newStatus = status.toLowerCase();
    
    application.status = newStatus;
    await application.save();

    // Send notifications and emails on status change
    if (oldStatus !== newStatus) {
      const companyName = application.job.company?.name || "the company";
      const applicantEmail = application.applicant.email;
      const applicantName = application.applicant.fullname;
      const jobTitle = application.job.title;

      if (newStatus === "accepted") {
        // 1. In-app Notification
        await Notification.create({
          user: application.applicant._id,
          message: `🎉 Congratulations! You have been selected for the job: ${jobTitle}`
        });

        // 2. Email Notification
        const subject = `🎉 Selected for Job: ${jobTitle} at ${companyName}`;
        const text = `Hello ${applicantName},\n\nGreat news! You have been selected for the position of "${jobTitle}" at "${companyName}".\n\nThe recruiter will be in touch with you shortly to discuss the next steps.\n\nBest regards,\nThe CareerCrafter Team`;
        const html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #ea580c; margin: 0; font-size: 28px;">CareerCrafter</h1>
            </div>
            <hr style="border: 0; border-top: 1px solid #e2e8f0;" />
            <h2 style="color: #0f172a; margin-top: 20px;">🎉 Congratulations, ${applicantName}!</h2>
            <p>Great news! You have been selected for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.</p>
            <p>The recruiter will be in touch with you shortly to discuss the next steps and onboarding process.</p>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
              <p style="margin: 0; font-size: 14px; font-weight: bold; color: #475569;">Application Status</p>
              <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #16a34a;">SELECTED / ACCEPTED</p>
            </div>
            <p>Best of luck with your new role!</p>
            <p style="margin-top: 30px; font-size: 12px; color: #64748b;">This is an automated notification from the CareerCrafter Platform.</p>
          </div>
        `;
        await sendMail(applicantEmail, subject, text, html);
      } else if (newStatus === "rejected") {
        // 1. In-app Notification
        await Notification.create({
          user: application.applicant._id,
          message: `Update on your application for: ${jobTitle}`
        });

        // 2. Email Notification
        const subject = `Update on your Application for ${jobTitle}`;
        const text = `Hello ${applicantName},\n\nThank you for your interest in the "${jobTitle}" position at "${companyName}".\n\nAfter careful review, we regret to inform you that we will not be moving forward with your application at this time.\n\nWe wish you the best of luck in your job search.\n\nBest regards,\nThe CareerCrafter Team`;
        const html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #ea580c; margin: 0; font-size: 28px;">CareerCrafter</h1>
            </div>
            <hr style="border: 0; border-top: 1px solid #e2e8f0;" />
            <h2 style="color: #0f172a; margin-top: 20px;">Application Update</h2>
            <p>Dear ${applicantName},</p>
            <p>Thank you for your interest in the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
            <p>After careful review of all candidates, we regret to inform you that we will not be moving forward with your application at this time.</p>
            <p>We appreciate the time you took to apply and interview, and we wish you the very best of luck in your job search and future career endeavors.</p>
            <p>Best regards,<br />The CareerCrafter Team</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 30px;" />
            <p style="font-size: 11px; color: #64748b; text-align: center;">This is an automated notification from the CareerCrafter Platform.</p>
          </div>
        `;
        await sendMail(applicantEmail, subject, text, html);
      }
    }

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true
    });

  } catch (error) {
    console.error("UpdateStatus Error:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false
    });
  }
};
// =========================== WITHDRAW APPLICATION ===========================
export const withdrawApplication = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    // Get the job (for notification message)
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // Delete the application
    const application = await Application.findOneAndDelete({ job: jobId, applicant: userId });

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // Remove application reference from the job
    await Job.findByIdAndUpdate(jobId, {
      $pull: { applications: application._id },
    });

    // Add notification
    await Notification.create({
      user: userId,
      message: `❌ You have withdrawn your application for: ${job.title}`,
    });

    return res.status(200).json({
      message: "Application withdrawn successfully.",
      success: true,
    });

  } catch (error) {
    console.error("Withdraw error:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
