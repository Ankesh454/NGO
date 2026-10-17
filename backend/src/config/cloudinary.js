import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = {
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME?.trim() || process.env.CLOUD_NAME?.trim(),
  api_key:
    process.env.CLOUDINARY_API_KEY?.trim() || process.env.CLOUD_API_KEY?.trim(),
  api_secret:
    process.env.CLOUDINARY_API_SECRET?.trim() || process.env.CLOUD_API_SECRET?.trim(),
};

const missingVariables = Object.entries(cloudinaryConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVariables.length > 0) {
  console.error(
    `Cloudinary configuration is incomplete. Missing: ${missingVariables.join(", ")}`
  );
}

cloudinary.config({
  ...cloudinaryConfig,
  secure: true,
});

export default cloudinary;
