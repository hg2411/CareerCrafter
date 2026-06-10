import { extractTextFromPdf } from "../utils/pdfParser.js";
import { buildResumePrompt } from "../prompts/resumePrompt.js";
import { analyzeCandidate } from "../services/gemini.service.js";
import { AIReport } from "../models/aiReport.model.js";

// POST /api/v1/ai/analyze
export const analyzeProfile = async (req, res) => {
  try {
    const { selfDescription, jobDescription } = req.body;
    const userId = req.id;

    if (!jobDescription || jobDescription.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Job description is required.",
      });
    }

    let resumeText = "";

    // Extract text from uploaded PDF if provided
    if (req.file) {
      resumeText = await extractTextFromPdf(req.file.buffer);
    }

    if (!resumeText && (!selfDescription || selfDescription.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume PDF or provide a self description.",
      });
    }

    // Build prompt
    const prompt = buildResumePrompt(
      resumeText,
      selfDescription || "",
      jobDescription
    );

    // Call Gemini
    const rawResponse = await analyzeCandidate(prompt);

    // Sanitize and parse JSON
    let cleaned = rawResponse.trim();
    // Strip any accidental markdown fences
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Gemini raw response:", rawResponse);
      return res.status(500).json({
        success: false,
        message: "AI returned an invalid response. Please try again.",
      });
    }

    // Save to MongoDB
    const report = await AIReport.create({
      user: userId,
      jobDescription,
      selfDescription: selfDescription || "",
      resumeText,
      matchScore: parsed.matchScore ?? 0,
      missingSkills: parsed.missingSkills ?? [],
      resumeSuggestions: parsed.resumeSuggestions ?? [],
      technicalQuestions: parsed.technicalQuestions ?? [],
      behavioralQuestions: parsed.behavioralQuestions ?? [],
      studyPlan: parsed.studyPlan ?? [],
    });

    return res.status(201).json({
      success: true,
      reportId: report._id,
    });
  } catch (error) {
    console.error("analyzeProfile error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

// GET /api/v1/ai/report/:id
export const getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.id;

    const report = await AIReport.findOne({ _id: id, user: userId });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    return res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("getReport error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};

// GET /api/v1/ai/reports
export const getAllReports = async (req, res) => {
  try {
    const userId = req.id;

    const reports = await AIReport.find({ user: userId })
      .sort({ createdAt: -1 })
      .select("_id jobDescription matchScore createdAt");

    return res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.error("getAllReports error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error.",
    });
  }
};