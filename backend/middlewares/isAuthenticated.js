// middlewares/isAuthenticated.js

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Authentication token missing",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY); // no need to `await` — it's synchronous

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default isAuthenticated;
