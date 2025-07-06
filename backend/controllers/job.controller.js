import { Job } from "../models/job.model.js";
import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js"; // ✅ import User

// admin post job
export const postJob = async (req, res) => {
  try {
    const { title, description, location, requirements, salary, jobType, experience, position, companyId } = req.body;
    const userId = req.id;

    if (!title || !description || !location || !requirements || !salary || !jobType || !experience || !position || !companyId) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId
    });

    // ✅ notify recruiter themself
    await Notification.create({
      user: userId,
      message: `✅ You successfully posted a new job: ${job.title}`
    });

    // ✅ notify all students
    const students = await User.find({ role: "student" }).select("_id");
    const notifications = students.map(student => ({
      user: student._id,
      message: `📢 New job posted: ${job.title}`
    }));
    await Notification.insertMany(notifications);

    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company");
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("company");
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// get jobs posted by the admin (current user)
export const getAdminJobs = async (req, res) => {
  try {
    const userId = req.id;
    const jobs = await Job.find({ created_by: userId }).populate("company");
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
