import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js"; // ✅ import User
import sendMail from "../utils/sendMail.js"; // ✅ import sendMail utility

export const cleanupExpiredJobs = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiredJobs = await Job.find({ lastDate: { $lt: today } }, { _id: 1 });
  if (!expiredJobs.length) return 0;

  const expiredJobIds = expiredJobs.map((job) => job._id);
  const deletedApplications = await Application.deleteMany({ job: { $in: expiredJobIds } });
  const deletedJobs = await Job.deleteMany({ _id: { $in: expiredJobIds } });

  return deletedJobs.deletedCount || 0;
};

// admin post job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      requirements,
      salary,
      jobType,
      experience,
      position,
      companyId,
      lastDate, 
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !location ||
      !requirements ||
      !salary ||
      !jobType ||
      experience=== undefined ||
      !position ||
      !companyId ||
      !lastDate
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // ✅ Validate lastDate is not in the past
    const today = new Date();
    const submittedLastDate = new Date(lastDate);
    if (submittedLastDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      return res.status(400).json({
        message: "Last date to apply cannot be in the past.",
        success: false,
      });
    }

    // ✅ Create the job
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(",").map((r) => r.trim()),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experience),
      position: Number(position),
      lastDate: submittedLastDate,
      company: companyId,
      created_by: userId,
    });

    // ✅ Notify recruiter
    await Notification.create({
      user: userId,
      message: `✅ You successfully posted a new job: ${job.title}`,
    });

    // ✅ Notify all students
    const students = await User.find({ role: "student" }).select("_id");
    const notifications = students.map((student) => ({
      user: student._id,
      message: `📢 New job posted: ${job.title}`,
    }));
    await Notification.insertMany(notifications);

    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error("Job post error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


// get all jobs
export const getAllJobs = async (req, res) => {
  try {
    await cleanupExpiredJobs();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const jobs = await Job.find({ lastDate: { $gte: today } })
      .populate("company");
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get job by ID
// job.controller.js
export const getJobById = async (req, res) => {
  try {
    await cleanupExpiredJobs();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const job = await Job.findOne({
      _id: req.params.id,
      lastDate: { $gte: today },
    })
      .populate({
        path: 'applications',
        populate: {
          path: 'applicant', // make sure applicant is populated
        }
      })
      .populate("created_by", "fullname email");

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found or expired" });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("getJobById error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// get jobs posted by the admin (current user)
export const getAdminJobs = async (req, res) => {
  try {
    await cleanupExpiredJobs();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const userId = req.id;
    const jobs = await Job.find({
      created_by: userId,
      lastDate: { $gte: today },
    })
      .populate("company")
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select: "fullname email profile.profilePhoto",
        },
      });
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// select a student for a job and send them an email
export const selectStudentForJob = async (req, res) => {
  try {
    const { studentId, jobId } = req.body;

    // find student and job details
    const student = await User.findById(studentId);
    const job = await Job.findById(jobId).populate("company");

    if (!student || !job) {
      return res.status(404).json({ success: false, message: "Student or job not found" });
    }
// email content
// email content
const studentName = student.fullname || student.email || "Student";
    const subject = `🎉🎉 CONGRATULATIONS, ${studentName}! You've been selected for the role of ${job.title} 🌟`;

    const text = `👋 Hi ${studentName},

Subject: Congratulations on Your Selection for ${job.title}

Dear ${studentName},

We are pleased to inform you that you have been selected for the position of "${job.title}" at ${job.company.name || "our company"}.

Please contact your recruiter or our HR team at your earliest convenience to complete onboarding and documentation.

We look forward to welcoming you aboard and wish you every success in your new role.

Best regards,

The CareerCrafter Team


`;

    // send email
    const mailSent = await sendMail(student.email, subject, text);

    if (!mailSent) {
      return res.status(500).json({ success: false, message: "Failed to send email to student." });
    }

    // optionally: add notification for student in DB
    await Notification.create({
      user: student._id,
      message: `🎉 You have been selected for the job: ${job.title}`
    });

    return res.status(200).json({
      success: true,
      message: "Student selected and email sent successfully."
    });
  } catch (error) {
    console.error("Error selecting student for job:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

