import pdfParse from "pdf-parse";
import axios from "axios";
import { User } from "../models/user.model.js";

// =================== Parse Uploaded Resume ===================
export const parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);
    const text = data.text;

    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const name = lines.find(
      (line) =>
        /^[A-Za-z\s]{3,50}$/.test(line) &&
        !line.toLowerCase().includes("resume") &&
        !line.toLowerCase().includes("curriculum") &&
        line.split(" ").length <= 4
    );

    const email =
      text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0] || "";
    const phone = text.match(/(?:\+91[-\s]?)?\d{10}/)?.[0] || "";
    const linkedin = text.match(/linkedin\.com\/[a-zA-Z0-9\-_/]+/)?.[0] || "";
    const github = text.match(/github\.com\/[a-zA-Z0-9\-_/]+/)?.[0] || "";

    const skillsMatch = text.match(
      /(?:Skills|Technical Skills|Skillset)\s*[:\-]?\s*([\s\S]{0,300})/i
    );

    let skills = [];
    if (skillsMatch) {
      const skillBlock = skillsMatch[1];
      skills = skillBlock
        .split(/,|\n|•|-|\u2022/)
        .map((s) => s.trim())
        .filter(
          (s) =>
            s.length > 1 &&
            s.length < 40 &&
            /^[a-zA-Z0-9.+#\s]+$/.test(s) &&
            !/(interest|coursework|soft skill|time management|teamwork|probl|area of|hobby)/i.test(
              s
            )
        );
    }

    return res.status(200).json({
      success: true,
      data: {
        name: name || "",
        email,
        phone,
        linkedin,
        github,
        skills,
      },
    });
  } catch (error) {
    console.error("Resume parse error:", error);
    res.status(500).json({ success: false, message: "Failed to parse resume" });
  }
};

// =================== Parse Stored Resume from DB ===================
export const parseStoredResume = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const student = await User.findById(studentId);
    if (!student || !student.profile?.resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found for this student",
      });
    }

    const response = await axios.get(student.profile.resume, {
      responseType: "arraybuffer",
    });

    const pdfBuffer = Buffer.from(response.data, "binary");
    const parsed = await pdfParse(pdfBuffer);
    const text = parsed.text;

    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    const name = lines.find(
      (line) =>
        /^[A-Za-z\s]{3,50}$/.test(line) &&
        !line.toLowerCase().includes("resume") &&
        !line.toLowerCase().includes("curriculum") &&
        line.split(" ").length <= 4
    );

    const email =
      text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0] ||
      student.email ||
      "N/A";
    const phone =
      text.match(/(?:\+91[-\s]?)?\d{10}/)?.[0] || student.phoneNumber || "N/A";
    const linkedin =
      text.match(/linkedin\.com\/[a-zA-Z0-9\-_/]+/)?.[0] || "N/A";
    const github = text.match(/github\.com\/[a-zA-Z0-9\-_/]+/)?.[0] || "N/A";

    const skillsMatch = text.match(
      /(?:Skills|Technical Skills|Skillset)\s*[:\-]?\s*([\s\S]{0,300})/i
    );

    let skills = [];
    if (skillsMatch) {
      const skillBlock = skillsMatch[1];
      skills = skillBlock
        .split(/,|\n|•|-|\u2022/)
        .map((s) => s.trim())
        .filter(
          (s) =>
            s.length > 1 &&
            s.length < 40 &&
            /^[a-zA-Z0-9.+#\s]+$/.test(s) &&
            !/(interest|coursework|soft skill|time management|teamwork|probl|area of|hobby)/i.test(
              s
            )
        );
    }

    return res.status(200).json({
      success: true,
      data: {
        name: name || student.fullname || "N/A",
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
