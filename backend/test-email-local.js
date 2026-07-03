import dotenv from "dotenv";
dotenv.config();
import sendMail from "./utils/sendMail.js";

console.log("SMTP USER:", process.env.SMTP_USER);
console.log("SMTP PASS Length:", process.env.SMTP_PASS?.length);

sendMail("careercrafterofficial123@gmail.com", "Test from CareerCrafter Script", "This is a test email")
  .then((res) => {
    console.log("Email sent result:", res);
  })
  .catch((err) => {
    console.error("Email test failed:", err);
  });
