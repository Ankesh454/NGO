import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import API from "../services/api";
import SEO from "../components/common/SEO";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await API.post("/contact", {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      toast.success("Thank you for contacting us. We will reply soon!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen">
      <SEO
        title="Contact Us"
        description="Get in touch with Mannat Foundation for donations, volunteering, or partnership opportunities."
        url="https://mannatfoundation.org/contact"
      />
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            Contact <span className="text-green-700">Us</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions or want to connect with us? We’d love to hear from you.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-12">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex gap-4 items-start">
              <FaMapMarkerAlt className="text-green-700 text-xl mt-1" />
              <p className="text-gray-700">
                <strong>Address:</strong><br />
                NGO Office Address, City, State, India
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <FaPhoneAlt className="text-green-700 text-xl" />
              <p className="text-gray-700">
                <strong>Phone:</strong> +91 9XXXXXXXXX
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <FaEnvelope className="text-green-700 text-xl" />
              <p className="text-gray-700">
                <strong>Email:</strong> contact@mannatfoundation.org
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-md space-y-6"
          >
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border rounded-lg px-4 py-3"
            />

            <textarea
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message"
              className="w-full border rounded-lg px-4 py-3"
            />

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-green-700 text-white hover:bg-green-800"
              }`}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
};




export default Contact;
