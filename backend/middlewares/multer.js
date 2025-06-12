import multer from "multer";

// Memory storage for Cloudinary
const storage = multer.memoryStorage();

// Filter: Only allow PDFs
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed for resumes"), false);
  }
};

// Configure multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter,
});

export const singleUpload = upload.single("file"); // <input name="file" />
