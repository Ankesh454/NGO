import cloudinary from "../config/cloudinary.js";
import Gallery from "../models/Gallery.model.js";
import streamifier from "streamifier";

const getOptimizedUrl = (url, type) => {
  if (!url || !url.includes("res.cloudinary.com")) {
    return url;
  }

  if (/\/upload\/[^/]*f_auto/.test(url)) {
    return url;
  }

  const transformation =
    type === "video"
      ? "f_auto,q_auto,vc_auto,w_1280,c_limit"
      : "f_auto,q_auto:good,w_1600,c_limit";

  return url.replace("/upload/", `/upload/${transformation}/`);
};

const uploadToCloudinary = (file, options) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result?.secure_url || !result?.public_id) {
          reject(new Error("Cloudinary returned an invalid upload result"));
          return;
        }

        resolve(result);
      }
    );

    streamifier
      .createReadStream(file.buffer)
      .on("error", reject)
      .pipe(uploadStream);
  });

const deleteCloudinaryAsset = async (publicId, type) => {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: type,
    invalidate: true,
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error("Cloudinary could not confirm media deletion");
  }

  return result;
};

// ADMIN: Upload image or video
export const uploadMedia = async (req, res) => {
  let uploadedAsset;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image or video",
      });
    }

    if (!req.file.buffer || !req.file.mimetype) {
      return res.status(400).json({
        success: false,
        message: "Invalid uploaded file",
      });
    }

    const isImage = req.file.mimetype.startsWith("image/");
    const isVideo = req.file.mimetype.startsWith("video/");

    if (!isImage && !isVideo) {
      return res.status(400).json({
        success: false,
        message: "Only image and video files are allowed",
      });
    }

    const resourceType = isVideo ? "video" : "image";

    const options = {
      resource_type: resourceType,
      folder: "foundation_gallery",
      ...(isVideo
        ? {
            transformation: [
              { quality: "auto", fetch_format: "auto" },
              { width: 1280, crop: "limit" },
            ],
          }
        : {
            transformation: [
              { quality: "auto:good", fetch_format: "auto" },
              { width: 1600, height: 1600, crop: "limit" },
            ],
          }),
    };

    const result = await uploadToCloudinary(req.file, options);
    uploadedAsset = result;

    const media = await Gallery.create({
      url: result.secure_url,
      public_id: result.public_id,
      type: resourceType,
    });

    return res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      media: {
        ...media.toObject(),
        url: getOptimizedUrl(media.url, media.type),
      },
    });
  } catch (error) {
    console.error("Gallery upload error:", error.message);

    if (uploadedAsset?.public_id) {
      try {
        await deleteCloudinaryAsset(
          uploadedAsset.public_id,
          uploadedAsset.resource_type || uploadedAsset.type || "image"
        );
      } catch (cleanupError) {
        console.error("Cloudinary cleanup error:", cleanupError.message);
      }
    }

    return res.status(500).json({
      success: false,
      message: "Failed to upload media",
    });
  }
};

// PUBLIC: Get gallery items
export const getGallery = async (req, res) => {
  try {
    const items = await Gallery.find()
      .sort({ createdAt: -1 })
      .lean();

    const optimizedItems = items.map((item) => ({
      ...item,
      url: getOptimizedUrl(item.url, item.type),
    }));

    return res.status(200).json({
      success: true,
      count: optimizedItems.length,
      items: optimizedItems,
    });
  } catch (error) {
    console.error("Gallery fetch error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to load gallery",
    });
  }
};

// ADMIN: Delete gallery media
export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid media ID",
      });
    }

    const media = await Gallery.findById(id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found",
      });
    }

    await deleteCloudinaryAsset(media.public_id, media.type);
    await media.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Media deleted successfully",
    });
  } catch (error) {
    console.error("Gallery delete error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete media",
    });
  }
};
