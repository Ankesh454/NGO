import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaShieldAlt,
  FaHeart,
  FaCheckCircle,
  FaCopy,
  FaCreditCard,
  FaLock,
  FaRupeeSign,
} from "react-icons/fa";
import toast from "react-hot-toast";
import SEO from "../components/common/SEO";
import { loadRazorpayScript } from "../utils/razorpay";
import API from "../services/api";

const PRESET_TIERS = [
  {
    amount: 500,
    label: "₹500",
    impact: "Provides 1 student learning kit or animal food supply",
  },
  {
    amount: 1000,
    label: "₹1,000",
    popular: true,
    impact: "Supplies school books & stationery for 2 children",
  },
  {
    amount: 2500,
    label: "₹2,500",
    impact: "Weekly healthcare & nutrition support for a senior citizen",
  },
  {
    amount: 5000,
    label: "₹5,000",
    impact: "Funds a village welfare camp and clean sanitation kit",
  },
];

const CAUSES = [
  "General Fund (Where Most Needed)",
  "Education Support & Mannat Library",
  "Community Welfare & Food Drives",
  "Senior Citizen Care & Free Therapy",
  "Animal Protection & Rescue Aid",
];

const Donate = () => {
  const [selectedTier, setSelectedTier] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [selectedCause, setSelectedCause] = useState(CAUSES[0]);

  const [donor, setDonor] = useState({
    name: "",
    email: "",
    phone: "",
    isAnonymous: false,
  });

  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [showBankDetails, setShowBankDetails] = useState(false);

  const finalAmount = isCustom ? Number(customAmount) : selectedTier;

  const handleTierSelect = (amt) => {
    setIsCustom(false);
    setSelectedTier(amt);
  };

  const handleCustomChange = (e) => {
    setIsCustom(true);
    setCustomAmount(e.target.value);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleRazorpayPayment = async (e) => {
    e.preventDefault();

    if (!finalAmount || finalAmount < 50) {
      toast.error("Please enter a minimum donation amount of ₹50");
      return;
    }

    if (!donor.name.trim() || !donor.email.trim()) {
      toast.error("Please provide your name and email address");
      return;
    }

    setLoading(true);

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error("Razorpay SDK failed to load. Please check your internet connection.");
        setLoading(false);
        return;
      }

      // Check for custom key or default test sandbox key
      const razorpayKey =
        import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder";

      // If placeholder is detected, notify user gently in test mode
      if (razorpayKey === "rzp_test_placeholder") {
        toast(
          "Running in Demo/Sandbox mode. Add your VITE_RAZORPAY_KEY_ID in .env for live gateway.",
          { icon: "ℹ️", duration: 5000 }
        );
      }

      const options = {
        key: razorpayKey,
        amount: Math.round(finalAmount * 100), // amount in paise
        currency: "INR",
        name: "Mannat Foundation",
        description: `Donation: ${selectedCause}`,
        image: "/favicon.png",
        prefill: {
          name: donor.isAnonymous ? "Anonymous Donor" : donor.name,
          email: donor.email,
          contact: donor.phone || "",
        },
        notes: {
          cause: selectedCause,
          donor_name: donor.name,
          is_anonymous: donor.isAnonymous ? "true" : "false",
        },
        theme: {
          color: "#15803d", // Green
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast("Donation checkout cancelled", { icon: "⚠️" });
          },
        },
        handler: async function (response) {
          const successData = {
            paymentId: response.razorpay_payment_id || `demo_pay_${Date.now()}`,
            amount: finalAmount,
            donorName: donor.isAnonymous ? "Anonymous" : donor.name,
            cause: selectedCause,
            email: donor.email,
            date: new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          // Record donation to backend if endpoint is ready
          try {
            await API.post("/donations", successData);
          } catch {
            // Non-blocking: donation succeeded on payment gateway
          }

          setPaymentSuccess(successData);
          setLoading(false);
          toast.success("Thank you for your generous contribution!");
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", function (response) {
        toast.error(
          response.error?.description || "Payment failed. Please try again."
        );
        setLoading(false);
      });

      razorpayInstance.open();
    } catch (err) {
      console.error("Razorpay checkout error:", err);
      toast.error("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-green-50/50 to-white min-h-screen py-16 md:py-24">
      <SEO
        title="Donate & Support"
        description="Make a secure donation via Razorpay to Mannat Foundation. Support education, healthcare, senior care, and community welfare."
        url="https://mannatfoundation.org/donate"
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-sm font-semibold mb-4">
            <FaHeart className="text-green-600" />
            <span>100% Goes Directly Towards Program Execution</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Support Our <span className="text-green-700">Mission</span>
          </h1>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            Every contribution directly empowers children with education, supports elderly
            care, and brings relief to underserved communities across India.
          </p>
        </motion.div>

        {/* Payment Confirmation Modal / View */}
        {paymentSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-green-100 text-center"
          >
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm mb-6">
              <FaCheckCircle />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Thank You for Your Generosity!
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Your contribution of{" "}
              <strong className="text-green-700 text-lg">
                ₹{paymentSuccess.amount.toLocaleString("en-IN")}
              </strong>{" "}
              was successfully processed via Razorpay.
            </p>

            <div className="mt-6 bg-gray-50 rounded-2xl p-5 text-left text-sm space-y-3 border border-gray-200">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-500">Transaction ID:</span>
                <span className="font-mono text-gray-800 text-xs font-semibold">
                  {paymentSuccess.paymentId}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-500">Donor Name:</span>
                <span className="font-semibold text-gray-800">
                  {paymentSuccess.donorName}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-500">Cause:</span>
                <span className="font-semibold text-green-800 text-right">
                  {paymentSuccess.cause}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Date & Time:</span>
                <span className="text-gray-700">{paymentSuccess.date}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setPaymentSuccess(null)}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
              >
                Make Another Donation
              </button>
              <button
                onClick={() => {
                  copyToClipboard(
                    paymentSuccess.paymentId,
                    "Transaction reference"
                  );
                }}
                className="px-5 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 font-medium text-gray-700 transition flex items-center justify-center gap-2"
              >
                <FaCopy /> Copy ID
              </button>
            </div>
          </motion.div>
        ) : (
          /* Main Donation Grid */
          <div className="mt-14 grid lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Cols: Razorpay Checkout Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100"
            >
              <form onSubmit={handleRazorpayPayment}>
                {/* 1. Choose Cause */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    1. Select Cause to Support
                  </label>
                  <select
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                  >
                    {CAUSES.map((cause, idx) => (
                      <option key={idx} value={cause}>
                        {cause}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Amount Selection */}
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    2. Select Donation Amount (INR)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PRESET_TIERS.map((tier) => (
                      <button
                        key={tier.amount}
                        type="button"
                        onClick={() => handleTierSelect(tier.amount)}
                        className={`relative py-3.5 px-3 rounded-xl border text-center transition font-bold text-base flex flex-col items-center justify-center ${
                          !isCustom && selectedTier === tier.amount
                            ? "bg-green-700 text-white border-green-700 shadow-md ring-2 ring-green-600/30"
                            : "bg-white text-gray-800 border-gray-200 hover:border-green-400 hover:bg-green-50/50"
                        }`}
                      >
                        {tier.popular && (
                          <span className="absolute -top-2.5 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Most Chosen
                          </span>
                        )}
                        <span>{tier.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Impact Note for selected tier */}
                  {!isCustom && (
                    <p className="mt-3 text-xs text-green-700 font-medium bg-green-50 p-2.5 rounded-lg border border-green-100 flex items-center gap-1.5">
                      <FaHeart className="text-green-600 flex-shrink-0" />
                      <span>
                        {
                          PRESET_TIERS.find((t) => t.amount === selectedTier)
                            ?.impact
                        }
                      </span>
                    </p>
                  )}

                  {/* Custom Amount input */}
                  <div className="mt-3">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                        <FaRupeeSign />
                      </span>
                      <input
                        type="number"
                        min="50"
                        step="50"
                        placeholder="Or enter custom amount (Min. ₹50)"
                        value={customAmount}
                        onChange={handleCustomChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border font-semibold focus:outline-none transition ${
                          isCustom
                            ? "border-green-600 ring-2 ring-green-500/20 bg-green-50/30"
                            : "border-gray-200 bg-gray-50 focus:border-green-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Donor Details */}
                <div className="mt-6 space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    3. Donor Information
                  </label>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={donor.name}
                      onChange={(e) =>
                        setDonor({ ...donor, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={donor.email}
                      onChange={(e) =>
                        setDonor({ ...donor, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number (for SMS receipt)"
                      value={donor.phone}
                      onChange={(e) =>
                        setDonor({ ...donor, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={donor.isAnonymous}
                      onChange={(e) =>
                        setDonor({ ...donor, isAnonymous: e.target.checked })
                      }
                      className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                    />
                    <span>Make my contribution anonymous</span>
                  </label>
                </div>

                {/* Pay Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition flex items-center justify-center gap-2.5 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-700 hover:bg-green-800 hover:shadow-xl"
                    }`}
                  >
                    <FaCreditCard />
                    {loading
                      ? "Processing Payment..."
                      : `Donate ₹${finalAmount ? finalAmount.toLocaleString("en-IN") : "0"} via Razorpay`}
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <FaLock className="text-green-600" />
                    <span>Secured by Razorpay • UPI, Cards, NetBanking supported</span>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Right 5 Cols: Transparency, Security & Bank Option */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Payment Methods Info Card */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-3">
                  <FaShieldAlt className="text-green-600" />
                  <span>Safe & Verified Payments</span>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We partner with <strong>Razorpay</strong> to provide a secure, encrypted checkout experience. You can contribute using:
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-700 font-medium">
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    ✓ UPI (GPay, PhonePe, Paytm)
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    ✓ Debit & Credit Cards
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    ✓ 50+ NetBanking Options
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    ✓ Digital Wallets
                  </div>
                </div>
              </div>

              {/* Direct Bank Transfer (Collapsible Card) */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FaUniversity className="text-green-700 text-xl" />
                    <h3 className="font-bold text-gray-900 text-base">
                      Direct Bank Transfer (NEFT/IMPS)
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowBankDetails(!showBankDetails)}
                    className="text-xs font-semibold text-green-700 hover:underline"
                  >
                    {showBankDetails ? "Hide Details" : "View Details"}
                  </button>
                </div>

                {showBankDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-gray-100 text-sm space-y-2 text-gray-700"
                  >
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-500">Account Name:</span>
                      <span className="font-medium">Mannat Foundation</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-500">Account Number:</span>
                      <span className="font-mono font-semibold">100293847562</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-500">Bank Name:</span>
                      <span className="font-medium">State Bank of India</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-gray-500">IFSC Code:</span>
                      <span className="font-mono font-semibold">SBIN0001234</span>
                    </div>
                    <p className="text-xs text-gray-500 pt-2">
                      Please mention <strong>“Donation”</strong> in the transfer remarks.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Impact Transparency Note */}
              <div className="bg-green-50/70 rounded-3xl p-6 border border-green-100">
                <h4 className="font-bold text-green-900 text-sm mb-2">
                  Our Transparency Commitment
                </h4>
                <p className="text-xs text-green-800/90 leading-relaxed">
                  Every rupee received is audited and directed towards education materials,
                  medical aid, animal care drives, and welfare essentials. We believe in complete
                  accountability to our donors and community partners.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Donate;
