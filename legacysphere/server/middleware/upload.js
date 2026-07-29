const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename: timestamp-randomstring-originalname
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    cb(null, `${nameWithoutExt}-${uniqueSuffix}${ext}`);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedImageTypes = /jpeg|jpg|png|gif|webp/;
  const allowedVideoTypes = /mp4|avi|mov|wmv|mkv|webm/;
  const allowedDocTypes = /pdf|doc|docx|txt|xls|xlsx|ppt|pptx/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  // Check if it's an image
  if (
    allowedImageTypes.test(extname.substring(1)) &&
    mimetype.startsWith("image/")
  ) {
    return cb(null, true);
  }

  // Check if it's a video
  if (
    allowedVideoTypes.test(extname.substring(1)) &&
    mimetype.startsWith("video/")
  ) {
    return cb(null, true);
  }

  // Check if it's a document
  if (
    allowedDocTypes.test(extname.substring(1)) &&
    (mimetype.startsWith("application/") || mimetype.startsWith("text/"))
  ) {
    return cb(null, true);
  }

  // Reject file
  cb(
    new Error(
      "Invalid file type. Only images, videos, and documents are allowed."
    )
  );
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
    files: 10, // Max 10 files per request
  },
  fileFilter: fileFilter,
});

// Helper function to determine media type from mimetype
const getMediaType = (mimetype) => {
  if (mimetype.startsWith("image/")) return "image";
  if (mimetype.startsWith("video/")) return "video";
  if (mimetype.startsWith("application/") || mimetype.startsWith("text/"))
    return "document";
  return "unknown";
};

module.exports = { upload, getMediaType };
