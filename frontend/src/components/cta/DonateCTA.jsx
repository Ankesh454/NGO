import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import donateBg from "../../assets/donate-bg.webp";

const DonateCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${donateBg})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-300 tracking-wide uppercase">
          Make the Change
        </h2>

        <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
          Your small contribution can bring dignity and hope to countless lives.
        </p>

        <button
          onClick={() => navigate("/donate")}
          className="border border-gray-300 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-green-500 hover:text-black transition"
          style={{ marginTop: "2.5rem" }}
                    
        >
          Donate Now
        </button>
      </motion.div>
    </section>
  );
};

export default DonateCTA;
