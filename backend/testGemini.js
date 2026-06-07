import dotenv from "dotenv";
dotenv.config();

import { analyzeCandidate } from "./services/gemini.service.js";
import { buildResumePrompt } from "./prompts/resumePrompt.js";

const sampleSelfDescription = `
I am a full-stack developer with 2 years of experience in React and Node.js.
I have built several REST APIs and worked with MongoDB. 
I am familiar with Git and basic CI/CD pipelines.
`;

const sampleJobDescription = `
We are looking for a Senior Backend Engineer with:
- 4+ years of Node.js experience
- Docker and Kubernetes knowledge
- Experience with microservices architecture
- GraphQL API design
- AWS or GCP cloud services
- Strong understanding of system design
`;

const run = async () => {
  console.log("🚀 Testing Gemini AI Career Coach...\n");

  try {
    const prompt = buildResumePrompt("", sampleSelfDescription, sampleJobDescription);
    console.log("📝 Prompt built successfully.\n");

    const response = await analyzeCandidate(prompt);
    console.log("✅ Gemini Response:\n");

    // Sanitize response
    let cleaned = response.trim();
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();

    const parsed = JSON.parse(cleaned);

    console.log("Match Score:", parsed.matchScore);
    console.log("Missing Skills:", parsed.missingSkills);
    console.log("Resume Suggestions:", parsed.resumeSuggestions.length, "items");
    console.log("Technical Questions:", parsed.technicalQuestions.length, "items");
    console.log("Behavioral Questions:", parsed.behavioralQuestions.length, "items");
    console.log("Study Plan Days:", parsed.studyPlan.length);

    console.log("\n✅ Full JSON:\n", JSON.stringify(parsed, null, 2));
  } catch (err) {
    console.error("❌ Test failed:", err.message);
  }
};

run();