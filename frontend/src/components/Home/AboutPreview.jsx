import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHandsHelping } from "react-icons/fa";

const AboutPreview = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <img
            src="/hero.webp"
            alt="About our NGO"
            loading="lazy"
            className="w-full rounded-xl shadow-md"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900">
            About <span className="text-green-700">Mannat Foundation</span>
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Mannat Foundation is a non-profit organization dedicated to supporting
            underprivileged communities through education, awareness, and social
            welfare initiatives.
          </p>

          <p className="mt-3 text-gray-600">
            We believe small actions can create meaningful change when people come
            together with compassion and purpose.
          </p>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 mt-6 text-green-700 font-semibold hover:underline"
          >
            <FaHandsHelping />
            Read More About Us
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutPreview;
