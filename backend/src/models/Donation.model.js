import mongoose from "mongoose";

const ALLOWED_CAUSES = [
  "General Fund (Where Most Needed)",
  "Education Support & Samarpan Library",
  "Education Support & Mannat Library",
  "Community Welfare & Food Drives",
  "Senior Citizen Care & Free Therapy",
  "Animal Protection & Rescue Aid",
];

const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      default: "Anonymous Supporter",
      trim: true,
      minlength: [2, "Donor name must be at least 2 characters"],
      maxlength: [100, "Donor name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [254, "Email cannot exceed 254 characters"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email",
      ],
      default: undefined,
    },

    amount: {
      type: Number,
      required: [true, "Donation amount is required"],
      min: [50, "Minimum donation amount is ₹50"],
      max: [500000, "Maximum donation amount is ₹5,00,000"],
      validate: {
        validator: Number.isFinite,
        message: "Donation amount must be a valid number",
      },
    },

    cause: {
      type: String,
      enum: {
        values: ALLOWED_CAUSES,
        message: "Please select a valid donation cause",
      },
      default: "General Fund (Where Most Needed)",
      trim: true,
      maxlength: [150, "Cause cannot exceed 150 characters"],
    },

    orderId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      maxlength: [100, "Order ID is too long"],
    },

    paymentId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      maxlength: [100, "Payment ID is too long"],
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "success", "failed"],
        message: "Invalid donation status",
      },
      default: "pending",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

donationSchema.index({ createdAt: -1 });

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
