import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [254, "Email cannot exceed 254 characters"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minlength: [60, "Password must be a bcrypt hash"],
      maxlength: [60, "Password must be a bcrypt hash"],
      match: [
        /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/,
        "Password must be a valid bcrypt hash",
      ],
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
      immutable: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

const User = mongoose.model("User", userSchema, "admins");

export default User;