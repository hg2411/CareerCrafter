import mongoose from "mongoose";

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    intention: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    intention: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const studyPlanSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    focus: { type: String, required: true },
    tasks: [{ type: String }],
  },
  { _id: false }
);

const aiReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    selfDescription: {
      type: String,
      default: "",
    },
    resumeText: {
      type: String,
      default: "",
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    missingSkills: [{ type: String }],
    resumeSuggestions: [{ type: String }],
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    studyPlan: [studyPlanSchema],
  },
  { timestamps: true }
);

export const AIReport = mongoose.model("AIReport", aiReportSchema);