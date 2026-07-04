import sendMail from "./utils/sendMail.js";
async function run() {
  console.log("Sending test email to careercrafterofficial123@gmail.com...");
  const success = await sendMail("careercrafterofficial123@gmail.com", "Test Email Status Update", "This is a test notification.");
  console.log("Mail sent successfully:", success);
  process.exit(0);
}
run();
