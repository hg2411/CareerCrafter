// middlewares/isAuthenticated.js
import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.id = decoded.userId;
      return next();
    } catch (error) {
      console.error("JWT verification failed:", error);
    }
  }

  // fallback: passport session user
  if (req.user?._id) {
    req.id = req.user._id;
    return next();
  }

  return res.status(401).json({ message: "Unauthorized", success: false });
};

export default isAuthenticated;
