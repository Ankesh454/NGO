import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  getDonations,
} from "../controllers/donation.controller.js";

const router = express.Router();

// Public donation ticker: only verified donations
router.get("/", getDonations);

// Create a Razorpay order before opening checkout
router.post("/create-order", createRazorpayOrder);

// Verify payment before marking a donation successful
router.post("/verify-payment", verifyRazorpayPayment);

export default router;