import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/getDataUri.js";
import cloudinary from "../utils/cloudinary.js";
import path from "path";

// ====================== Register ======================
export const register = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "Something is missing", success: false });
    }

    const file = req.file;
    const fileuri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileuri.content);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ====================== Login ======================
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Something is missing", success: false });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or Password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Incorrect email or Password", success: false });
    }

    if (role !== user.role) {
      return res.status(400).json({ message: "Account does not exist with the selected role", success: false });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

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
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ message: `Welcome back ${user.fullname}`, user, success: true });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ====================== Logout ======================
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ====================== Get Current User (GET /auth/me) ======================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.id); // req.id should be set by auth middleware
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const safeUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({ success: true, user: safeUser });
  } catch (error) {
    console.error("GetMe Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ====================== Update Profile ======================
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    let cloudResponse = null;

    if (file) {
      const fileUri = getDataUri(file);
      const fileExtension = path.extname(file.originalname).substring(1);

      const uploadOptions = {
        resource_type: "raw",
        folder: "resumes",
        public_id: file.originalname.split(".")[0],
      };

      if (fileExtension) {
        uploadOptions.format = fileExtension;
      }

      cloudResponse = await cloudinary.uploader.upload(fileUri.content, uploadOptions);
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim()).filter((skill) => skill.length > 0);
    }

    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (!user.profile) user.profile = {};
    if (bio) user.profile.bio = bio;
    if (skills !== undefined) user.profile.skills = skillsArray;

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({ message: "Profile updated successfully", user, success: true });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
