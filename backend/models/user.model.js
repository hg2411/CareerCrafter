import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number }, // Make phone optional for Google auth
    password: { type: String }, // Make password optional for Google auth
    googleId: { type: String, unique: true, sparse: true }, // For Google login
    role: { type: String, enum: ["student", "recruiter"] }, // no required
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: { type: String, default: "" },
    },
      resetOTP: { type: String },            
    resetOTPExpires: { type: Date }, 
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
export default User;
