import { Company } from "../models/company.model.js";
import getDataUri from "../utils/getDataUri.js";
import cloudinary from "../utils/cloudinary.js";


export const registerCompany = async (req, res) => {
    try {
    const { companyName } = req.body;
    if (!companyName) {
        return res.status(400).json({
        message: "Company name is required",
        success: false,
        });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
        return res.status(400).json({
        message: "You can't register same company.",
        success: false,
        });
    }
    company = await Company.create({
        name: companyName,
        userId: req.id,
        });

    return res.status(201).json({
        message: "Company registered successfully.",
        company,
        success: true,
    });
    } catch (error) {
    console.error(error);
    return res.status(500).json({
        message: "Internal Server Error",
        success: false,
    });
    }
};
export const getCompany = async (req, res) => {
    try {
    const userId = req.id; // logged in user id
    const companies = await Company.find({ userId });
    if (companies.length === 0) {
        return res.status(404).json({
        message: "No companies found.",
        success: false,
    });
    }
    return res.status(200).json({
        companies,
        success: true,
    });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        message: "Internal Server Error",
        success: false,
    });
    }
};
// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
        return res.status(404).json({
            message: "Company not found.",
            success: false,
        });
    }
    return res.status(200).json({
        company,
        success: true,
    });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        message: "Internal Server Error",
        success: false,
    });
    }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const updateData = {
      name,
      description,
      website,
      location,
    };

    if (file) {
      const fileUri = getDataUri(file);
      const myCloud = await cloudinary.uploader.upload(fileUri.content, {
        folder: "company_logos",
      });

      updateData.logo = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Update failed:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
