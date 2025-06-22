// middlewares/passportAuth.js

const passportAuth = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    success: false,
    message: "Not authenticated",
  });
};

export default passportAuth;
