import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaHeart } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/hero-bg.webp"
        alt="Helping communities"
        className="absolute inset-0 w-full h-full object-cover brightness-125"
        loading="eager"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-400/40 text-green-300 text-sm font-medium mb-6 backdrop-blur">
              <FaHeart className="text-green-400 text-xs" />
              <span>Non-Profit Community Foundation</span>
            </div>

            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Together, We Can <br />
              <span className="text-green-400">Make a Difference</span>
            </h1>

            <p className="mt-6 text-gray-200 text-lg leading-relaxed">
              Supporting underprivileged communities through compassion, education,
              and healthcare. Your contribution enables real, lasting grassroots impact.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {/* Primary CTA */}
              <Link
                to="/donate"
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-semibold shadow-xl transition inline-flex items-center justify-center gap-2 group"
              >
                <span>Donate Online</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>

              {/* Secondary CTA */}
              <Link
                to="/our-work"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/25 rounded-xl text-lg font-semibold backdrop-blur transition inline-flex items-center justify-center"
              >
                Our Initiatives
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-400" />
                <span>Secure Payments via Razorpay</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span>Verified Non-Profit Outreach</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
