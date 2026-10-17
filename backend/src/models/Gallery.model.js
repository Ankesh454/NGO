import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Media URL is required"],
      trim: true,
      maxlength: [2048, "Media URL is too long"],
      validate: {
        validator: (value) => /^https:\/\/\S+$/i.test(value),
        message: "Please provide a valid HTTPS media URL",
      },
    },

    public_id: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
      trim: true,
      maxlength: [255, "Cloudinary public ID is too long"],
    },

    type: {
      type: String,
      enum: {
        values: ["image", "video"],
        message: "Media type must be image or video",
      },
      required: [true, "Media type is required"],
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

gallerySchema.index({ createdAt: -1 });

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
