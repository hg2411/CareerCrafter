import multer from "multer";

const storage = multer.memoryStorage();

// export singleUpload: used for /register route
export const singleUpload = multer({ storage }).single("file");

// export multipleUpload: used for /profile/update route
export const multipleUpload = multer({ storage }).fields([
  { name: "file", maxCount: 1 },           // resume (PDF)
  { name: "profilePhoto", maxCount: 1 },   // profile photo (image)
]);
