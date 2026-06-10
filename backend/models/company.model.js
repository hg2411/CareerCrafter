import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  logo: {
    public_id: {
      type: String,
      required: false, 
    },
    url: {
      type: String,
      required: false, 
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
}, { timestamps: true });

export const Company = mongoose.model("Company", companySchema);
