
import { Job } from "../models/job.model.js";
// admin post job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements,salary,jobType,experience,position,companyId } = req.body;
        const userId = req.id;
        if(!title || !description || !requirements || !salary || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
           experienceLevel: experience,
            position,
            company:companyId,
           created_by:userId
        });
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
}
// for students to get all jobs 
export const getAllJobs = async (req, res) => {
    try {
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        };
        const jobs= await Job.find(query);
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found",
                success: false,
            })
        };
        return res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            jobs,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}
// for students to get a job by id
const getJobById = async (req, res) => {
    try {
        const jobId=req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false,
            })
        };
        return res.status(200).json({
            message: "Job fetched successfully",
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
}
// for admin to create a job
export const getAdminJobs= async (req, res) => {
    try {
        const adminId= req.id;
        const jobs= await Job.find({created_by:adminId}).populate("company","name");
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found for this admin",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            jobs,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}
