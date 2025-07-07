import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., "Gmail", "Yahoo", or custom SMTP
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // ⚠️ use app password if Gmail with 2FA
  },
});

/**
 * Send an email
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} text - plain text content
 * @returns {boolean} true if sent, false if failed
 */
export default async function sendMail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });
    return true;
  } catch (error) {
    console.error("Send Mail Error:", error);
    return false;
  }
}
