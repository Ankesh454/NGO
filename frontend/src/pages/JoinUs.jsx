import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUser, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import API from "../services/api";
import SEO from "../components/common/SEO";

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
          await API.post("/join-us", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      });
      toast.success("Thank you for joining us! We will contact you soon.");

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-green-50 min-h-screen">
      <SEO
        title="Join Us"
        description="Volunteer and become a part of Mannat Foundation's mission to create positive change."
        url="https://mannatfoundation.org/join-us"
      />
      <div className="max-w-3xl mx-auto px-6 py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            Join <span className="text-green-700">Us</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Become a part of our mission and help us create positive change.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-10 bg-white p-8 rounded-xl shadow-md space-y-6"
        >

          <div>
            <label className="block mb-2">Full Name</label>
            <div className="flex items-center border rounded-lg px-3">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Phone Number</label>
            <div className="flex items-center border rounded-lg px-3">
              <FaPhoneAlt className="text-gray-400" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Email Address</label>
            <div className="flex items-center border rounded-lg px-3">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">How would you like to help?</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 text-white hover:bg-green-800"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

        </motion.form>
      </div>
    </section>
  );
};

export default JoinUs;
