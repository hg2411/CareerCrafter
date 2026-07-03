import User from "../models/user.model.js";

export const getStats = async (req, res) => {
  try {
    // Count total users
    const totalUsers = await User.countDocuments();
    // Count total recruiters
    const recruiters = await User.countDocuments({ role: "recruiter" });
       


    res.json({
      activeUsers: totalUsers,  // rename to total users if you prefer
      recruiters,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
