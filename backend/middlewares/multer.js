// middlewares/multer.js
import multer from "multer";

// Use memory storage since we're uploading to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Optional: Restrict file types (e.g., only PDFs)
  const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, PNG, or JPEG files are allowed"), false);
  }
};

// Configure multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});

// Exported middleware to be used in routes
export const singleUpload = upload.single("file"); // <input name="file" />
