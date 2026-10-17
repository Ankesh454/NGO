import crypto from "crypto";
import Razorpay from "razorpay";
import Donation from "../models/Donation.model.js";

const ALLOWED_CAUSES = [
  "General Fund (Where Most Needed)",
  "Education Support & Samarpan Library",
  "Education Support & Mannat Library",
  "Community Welfare & Food Drives",
  "Senior Citizen Care & Free Therapy",
  "Animal Protection & Rescue Aid",
];

const getRazorpay = () => {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }

  return new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
};

const donationResponse = (donation) => ({
  paymentId: donation.paymentId,
  amount: donation.amount,
  donorName: donation.donorName,
  cause: donation.cause,
  date: donation.date,
});

// POST /api/donations/create-order
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, donorName, email, cause } = req.body ?? {};

    // Accept only a number or a numeric string containing whole rupees.
    if (
      (typeof amount !== "number" && typeof amount !== "string") ||
      (typeof amount === "string" && !/^\d+$/.test(amount.trim()))
    ) {
      return res.status(400).json({
        success: false,
        message: "Donation amount must be a whole number of rupees",
      });
    }

    const donationAmount = Number(amount);
    const cleanName = typeof donorName === "string" ? donorName.trim() : "";
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (
      !Number.isSafeInteger(donationAmount) ||
      donationAmount < 50 ||
      donationAmount > 500000
    ) {
      return res.status(400).json({
        success: false,
        message: "Donation amount must be between ₹50 and ₹5,00,000",
      });
    }

    if (!cleanName || cleanName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "A valid donor name is required",
      });
    }

    if (
      normalizedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid email address is required",
      });
    }

    if (
      typeof cause !== "string" ||
      !ALLOWED_CAUSES.includes(cause)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid donation cause",
      });
    }

    const razorpay = getRazorpay();

    const order = await razorpay.orders.create({
      amount: donationAmount * 100,
      currency: "INR",
      receipt: `don_${crypto.randomUUID().replaceAll("-", "").slice(0, 20)}`,
      notes: {
        donor_name: cleanName,
        cause,
      },
    });

    try {
      await Donation.create({
        orderId: order.id,
        amount: donationAmount,
        donorName: cleanName,
        email: normalizedEmail,
        cause,
        status: "pending",
      });
    } catch (databaseError) {
      console.error(
        "Failed to save pending donation:",
        databaseError.message
      );

      // The Razorpay order exists, but no local donation record was saved.
      return res.status(500).json({
        success: false,
        message:
          "Unable to save the donation order. Please contact support before retrying payment.",
      });
    }

    return res.status(201).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Razorpay order error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create donation order",
    });
  }
};

// POST /api/donations/verify-payment
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    } = req.body ?? {};

    if (
      typeof orderId !== "string" ||
      typeof paymentId !== "string" ||
      typeof signature !== "string" ||
      !orderId.trim() ||
      !paymentId.trim() ||
      !/^[a-fA-F0-9]{64}$/.test(signature)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing payment verification details",
      });
    }

    const donation = await Donation.findOne({ orderId });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation order not found",
      });
    }

    if (donation.status === "success") {
      if (donation.paymentId !== paymentId) {
        return res.status(409).json({
          success: false,
          message: "This order has already been paid",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Payment already verified",
        data: donationResponse(donation),
      });
    }

    if (donation.status !== "pending") {
      return res.status(409).json({
        success: false,
        message: "This donation cannot be verified",
      });
    }

    const { RAZORPAY_KEY_SECRET } = process.env;

    if (!RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay secret is not configured");
    }

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest();

    const receivedSignature = Buffer.from(signature, "hex");

    if (
      receivedSignature.length !== expectedSignature.length ||
      !crypto.timingSafeEqual(expectedSignature, receivedSignature)
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment signature verification failed",
      });
    }

    // Verify the payment directly with Razorpay.
    const razorpay = getRazorpay();
    const payment = await razorpay.payments.fetch(paymentId);

    if (
      payment.order_id !== orderId ||
      payment.amount !== donation.amount * 100 ||
      payment.currency !== "INR" ||
      (payment.status !== "captured" && payment.status !== "authorized")
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payment is not captured yet. Please check the payment status before retrying.",
      });
    }

    if (payment.status === "authorized") {
      await razorpay.payments.capture(paymentId, donation.amount * 100, "INR");
    }

    // Conditional update prevents overwriting a donation already verified
    // by another concurrent request.
    const updatedDonation = await Donation.findOneAndUpdate(
      {
        _id: donation._id,
        status: "pending",
      },
      {
        $set: {
          paymentId,
          status: "success",
          date: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDonation) {
      const latestDonation = await Donation.findById(donation._id);

      if (
        latestDonation?.status === "success" &&
        latestDonation.paymentId === paymentId
      ) {
        return res.status(200).json({
          success: true,
          message: "Payment already verified",
          data: donationResponse(latestDonation),
        });
      }

      return res.status(409).json({
        success: false,
        message: "Donation status changed. Please check payment status.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Donation payment verified successfully",
      data: donationResponse(updatedDonation),
    });
  } catch (error) {
    console.error("Payment verification error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to verify payment. Please check the payment status.",
    });
  }
};

// GET /api/donations
// Public endpoint for the donation ticker.
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ status: "success" })
      .select("donorName amount cause date createdAt -_id")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.status(200).json(donations);
  } catch (error) {
    console.error("Fetch donations error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch donations",
    });
  }
};