/**
 * Builds a strict Gemini prompt for candidate analysis.
 * @param {string} resumeText - Extracted text from resume PDF.
 * @param {string} selfDescription - User's self-description.
 * @param {string} jobDescription - Target job description.
 * @returns {string} - Complete prompt string.
 */
export const buildResumePrompt = (resumeText, selfDescription, jobDescription) => {
  const candidateProfile =
    resumeText
      ? `RESUME:\n${resumeText}`
      : `SELF DESCRIPTION:\n${selfDescription}`;

  return `You are an expert AI Career Coach and Technical Recruiter with 15+ years of experience evaluating candidates for software engineering, data science, and technology roles.

Analyze the candidate profile against the job description and return a STRICT JSON response.

---
CANDIDATE PROFILE:
${candidateProfile}

---
JOB DESCRIPTION:
${jobDescription}

---
INSTRUCTIONS:
1. Calculate a realistic matchScore (0-100) based on skill alignment, experience level, and role fit.
2. List all missingSkills the candidate lacks for this role (be specific, e.g., "Docker", "GraphQL", "System Design").
3. Provide resumeSuggestions as actionable improvements the candidate can make to their resume.
4. Generate 5 technicalQuestions relevant to this job. For each, include the question, the intention (what it tests), and a model answer.
5. Generate 5 behavioralQuestions using STAR format. For each, include the question, the intention, and a model answer.
6. Create a 7-day studyPlan to bridge the skill gaps. Each day must have a focus topic and 3-5 concrete tasks.

CRITICAL RULES:
- Return ONLY raw JSON. No markdown. No backticks. No explanations. No preamble.
- The response must start with { and end with }.
- All arrays must have at least 1 item.
- technicalQuestions and behavioralQuestions must each have exactly 5 items.
- studyPlan must have exactly 7 items (day 1 through day 7).

Return this exact JSON structure:
{
  "matchScore": 0,
  "missingSkills": [],
  "resumeSuggestions": [],
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "studyPlan": [
    {
      "day": 1,
      "focus": "",
      "tasks": []
    }
  ]
}`;
};