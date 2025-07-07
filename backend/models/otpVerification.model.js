import mongoose from "mongoose";

const otpVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // expires after 5 min
});

export const OtpVerification = mongoose.model("OtpVerification", otpVerificationSchema);
export default OtpVerification;