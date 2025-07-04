import pdfParse from "pdf-parse";
import axios from "axios";
import fs from "fs";
import { User } from "../models/user.model.js";

// =================== Parse Uploaded Resume ===================
export const parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);
    const text = data.text;

    const emailMatch = text.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+/);
    const phoneMatch = text.match(/(\+91[-\s]?)?\d{10}/);
    const linkedinMatch = text.match(/(https?:\/\/)?(www\.)?linkedin\.com\/[a-zA-Z0-9\-_/]+/i);
    const githubMatch = text.match(/(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9\-_/]+/i);


    const lines = text.split("\n").map(line => line.trim()).filter(line => line !== "");
    const nameMatch = lines[0];

    const skillsSection = text.split(/skills|technical skills|skillset/i)[1];
    let skills = [];
    if (skillsSection) {
      const skillLine = skillsSection.split("\n")[1] || "";
      skills = skillLine.split(/,|•|-|\u2022/).map(s => s.trim()).filter(s => s.length > 1);
    }

    const result = {
      name: nameMatch || "",
      email: emailMatch ? emailMatch[0] : "",
      phone: phoneMatch ? phoneMatch[0] : "",
      linkedin: linkedinMatch ? linkedinMatch[0] : "",
      github: githubMatch ? githubMatch[0] : "",
      skills,
      rawText: text,
    };

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Resume parse error:", error);
    res.status(500).json({ success: false, message: "Failed to parse resume" });
  }
}; 

// =================== Parse Stored Resume from DB ===================
export const parseStoredResume = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Step 1: Fetch student by ID
    const student = await User.findById(studentId);
    if (!student || !student.profile?.resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found for this student",
      });
    }

    // Step 2: Download resume PDF from Cloudinary
    const resumeUrl = student.profile.resume;

    const response = await axios.get(resumeUrl, {
      responseType: "arraybuffer",
    });

    const pdfBuffer = Buffer.from(response.data, "binary");

    // Step 3: Parse PDF
    const parsed = await pdfParse(pdfBuffer);
    const text = parsed.text;

    // Step 4: Extract fields (improve regex later)
    const name = text.match(/Name\s*[:\-]?\s*(.*)/i)?.[1]?.trim() || student.fullname || "N/A";
    const email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0] || student.email || "N/A";
    const phone = text.match(/(?:\+91[-\s]?)?\d{10}/)?.[0] || student.phoneNumber || "N/A";
    const linkedin = text.match(/linkedin\.com\/in\/[a-zA-Z0-9-]+/)?.[0] || "N/A";
    const github = text.match(/github\.com\/[a-zA-Z0-9-]+/)?.[0] || "N/A";

    let skills = [];
    const skillsSection = text.match(/skills\s*[:\-]?\s*([\s\S]*?)(?=\n\S|$)/i);

    if (skillsSection) {
      skills = skillsSection[1]
        .split(/[,•\n\-–]+/) // Split on commas, bullets, dashes, or newlines
        .map(s => s.trim())
        .filter(s => s.length > 1 && s.length < 50); // Remove junk
    }
    return res.status(200).json({
      success: true,
      data: {
        name,
        email,
        phone,
        linkedin,
        github,
        skills,
      },
    });
  } catch (error) {
    console.error("Parsing stored resume error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to parse stored resume",
    });
  }
};