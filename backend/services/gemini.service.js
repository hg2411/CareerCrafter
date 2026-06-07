import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
         console.log(process.env.GEMINI_API_KEY);
     console.log("Key Prefix:", process.env.GEMINI_API_KEY?.slice(0, 10));
/**
 * Sends a prompt to Gemini and returns the raw text response.
 * @param {string} prompt - The full prompt string.
 * @returns {Promise<string>} - Gemini's text response.
 */
export const analyzeCandidate = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    throw new Error(`Gemini API error: ${error.message}`);
  }
};