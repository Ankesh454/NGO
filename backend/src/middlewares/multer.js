import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const allowedMimeTypes = new Map([
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".gif", "image/gif"],
  [".mp4", "video/mp4"],
  [".webm", "video/webm"],
  [".mov", "video/quicktime"],
]);

const fileFilter = (req, file, callback) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const expectedMimeType = allowedMimeTypes.get(extension);

  if (!expectedMimeType || file.mimetype !== expectedMimeType) {
    return callback(
      new Error(
        "Only matching JPG, JPEG, PNG, WEBP, GIF, MP4, WEBM and MOV files are allowed"
      )
    );
  }

  return callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 1,
    fields: 10,
    parts: 11,
  },
});

export default upload;