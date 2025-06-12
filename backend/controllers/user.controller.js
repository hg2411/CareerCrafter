import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/getDataUri.js";
import cloudinary from "../utils/cloudinary.js";
import path from "path"; // Import path module for robust extension extraction

// Register controller (unchanged, keeping for context)
export const register = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Register Error:", error); // Use console.error for errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// Login controller (unchanged, keeping for context)
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or Password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email or Password", success: false });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with the selected role",
        success: false,
      });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production'
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// Logout controller (unchanged, keeping for context)
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === 'production' })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error("Logout Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// Update Profile controller with enhanced debug logging
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; // The uploaded file, typically from middleware like 'multer'

    console.log("--- DEBUG: Update Profile Start ---");
    console.log("Request Body (partial):", { fullname, email, phoneNumber, bio, skills });
    console.log("Received file object (req.file):", file); // CRITICAL: Check file.buffer, file.mimetype, file.originalname, file.size

    let cloudResponse = null;

    if (file) {
      // Validate file object before proceeding with data URI generation
      if (!file.buffer || !file.mimetype || !file.originalname) {
        console.error("ERROR: File object missing required properties (buffer, mimetype, or originalname).");
        return res.status(400).json({ message: "Invalid file data provided (missing buffer, mimetype, or originalname).", success: false });
      }

      console.log(`File received: originalname='${file.originalname}', mimetype='${file.mimetype}', size=${file.size} bytes`);

      const fileUri = getDataUri(file);
      console.log(`Data URI generated. Content type: ${fileUri.mimetype}, Length: ${fileUri.content ? fileUri.content.length : "N/A"} bytes`);
      // console.log("Data URI content (first 100 chars):", fileUri.content ? fileUri.content.substring(0, 100) + '...' : "N/A"); // Uncomment for deeper inspection if needed, but be aware of console limits

      try {
        // More robust way to extract the file extension
        // path.extname returns '.pdf', so we use substring(1) to remove the dot.
        const fileExtension = path.extname(file.originalname).substring(1);
        
        console.log(`DEBUG: Extracted file extension BEFORE Cloudinary upload: '${fileExtension}'`); // NEW CRITICAL LOG

        const uploadOptions = {
          resource_type: "raw", // Keeps "raw" for document files
          folder: "resumes",
          public_id: file.originalname.split(".")[0],
        };

        if (fileExtension) { // Only add format if extension is valid
          uploadOptions.format = fileExtension;
        } else {
          console.warn("WARNING: File extension could not be reliably determined, skipping 'format' option for Cloudinary. Original MIME type:", file.mimetype);
          // As a fallback, if extension is not found, try to map from mimetype
          // This is a more advanced fallback; for now, we'll rely on the extension being present.
        }

        cloudResponse = await cloudinary.uploader.upload(fileUri.content, uploadOptions); // Use uploadOptions
        console.log("Cloudinary Upload SUCCESS. Full Response:", cloudResponse);
        // Specifically check these Cloudinary response properties for correct identification:
        console.log("Cloudinary response - resource_type:", cloudResponse.resource_type); // Should now be 'raw'
        console.log("Cloudinary response - format:", cloudResponse.format);       // e.g., 'pdf', 'docx'
        console.log("Cloudinary response - bytes:", cloudResponse.bytes);         // Size of uploaded file as perceived by Cloudinary
        console.log("Cloudinary response - secure_url:", cloudResponse.secure_url); // The URL where the file is hosted
      } catch (cloudinaryError) {
        console.error("ERROR: Cloudinary Upload Failed:", cloudinaryError.message || cloudinaryError);
        return res.status(500).json({ message: "Failed to upload resume to cloud.", success: false });
      }
    } else {
      console.log("No file was provided in the request (req.file is null/undefined).");
    }

    let skillsArray;
    if (skills) {
      // Split skills string into an array, removing potential empty strings
      skillsArray = skills.split(",").map(skill => skill.trim()).filter(skill => skill.length > 0);
      console.log("Parsed skillsArray:", skillsArray);
    }

    // Assuming req.id is set by an authentication middleware that verifies the JWT
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      console.error("ERROR: User not found for ID:", userId);
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Update user fields if provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    
    // Initialize profile if it doesn't exist (though your schema likely defaults it)
    if (!user.profile) {
      user.profile = {};
      console.log("Initialized user.profile as it was null/undefined.");
    }

    if (bio) user.profile.bio = bio;
    // Only update skills if `skills` was actually provided in the request body
    if (skills !== undefined) { // Check for undefined to allow empty string to clear skills
        user.profile.skills = skillsArray;
    }

    // If a resume was uploaded to Cloudinary, update the user's profile
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // Store the secure URL of the uploaded resume
      user.profile.resumeOriginalName = file.originalname; // Store the original name for display
      console.log(`User profile resume updated to URL: ${user.profile.resume}, original name: ${user.profile.resumeOriginalName}`);
    } else {
        console.log("No new resume uploaded, keeping existing or leaving null.");
    }

    await user.save(); // Save the updated user document
    console.log("User document saved successfully to database.");

    // Return the updated user object (excluding sensitive info like password)
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    console.log("Prepared user object for response:", user);

    console.log("--- DEBUG: Update Profile End (Success) ---");
    return res
      .status(200)
      .json({ message: "Profile updated successfully", user, success: true });
  } catch (error) {
    console.error("--- DEBUG: Update Profile End (Error) ---");
    console.error("Update Profile Caught Error:", error); // Log the full error object
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
