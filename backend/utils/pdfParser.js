import pdfParse from "pdf-parse";

/**
 * Extracts plain text from a PDF buffer.
 * @param {Buffer} buffer - The PDF file buffer.
 * @returns {Promise<string>} - Extracted text content.
 */
export const extractTextFromPdf = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    return data.text || "";
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
};