import { User } from "../models/user.model.js";
import { OtpVerification } from "../models/otpVerification.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/getDataUri.js";
import cloudinary from "../utils/cloudinary.js";
import sendMail from "../utils/sendMail.js";

// ====================== Send OTP ======================
export const sendOtpForRegistration = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email is required", success: false });

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      return res.status(400).json({ message: "Please enter a valid email address.", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email", success: false });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const mailSent = await sendMail(email, "Verify your email", `Your OTP is: ${otp}`);
    if (!mailSent) {
      return res.status(400).json({ message: "Could not send email. Please enter a correct email.", success: false });
    }

    await OtpVerification.create({ email, otp });

    return res.status(200).json({ message: "OTP sent to email", success: true });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// ====================== Verify OTP & Register ======================
export const verifyOtpAndRegister = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role, otp } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role || !otp) {
      return res.status(400).json({ message: "All fields & OTP are required", success: false });
    }

    const latestOtp = await OtpVerification.findOne({ email }).sort({ createdAt: -1 });
    if (!latestOtp || latestOtp.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const file = req.file;
    let profilePhotoUrl = "";
    if (file) {
      const fileuri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileuri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    // Create new user
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: { profilePhoto: profilePhotoUrl },
    });

    // Clean up used OTPs
    await OtpVerification.deleteMany({ email });

    // Issue JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Verify OTP & Register Error:", error);
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

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

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

// ====================== Get Current User ======================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.id);
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
    const file = req.files?.file?.[0]; // resume
    const profilePhoto = req.files?.profilePhoto?.[0]; // profile picture

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim()).filter((skill) => skill.length > 0);
    }

    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (!user.profile) user.profile = {};
    if (bio) user.profile.bio = bio;
    if (skills !== undefined) user.profile.skills = skillsArray;

    if (profilePhoto) {
      const fileUri = getDataUri(profilePhoto);
      const upload = await cloudinary.uploader.upload(fileUri.content, { folder: "profile_photos" });
      user.profile.profilePhoto = upload.secure_url;
    }

    if (file) {
      const fileUri = getDataUri(file);
      const upload = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
        folder: "resumes",
        public_id: file.originalname.split(".")[0],
      });
      user.profile.resume = upload.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({ message: "Profile updated successfully", user: updatedUser, success: true });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
