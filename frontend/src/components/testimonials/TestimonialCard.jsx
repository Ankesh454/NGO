import { motion } from "framer-motion";

const TestimonialCard = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto text-center px-6"
    >
      {/* Avatar */}
      <div className="w-32 h-32 mx-auto rounded-full border-4 border-green-500 overflow-hidden">
        <img
          src={data.image}   // ✅ FIX
          alt={data.name}    // ✅ FIX
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="mt-4 text-xl font-semibold text-gray-800">
        {data.name}
      </h3>

      <p className="text-green-600 text-sm">{data.role}</p>

      <p className="mt-4 text-gray-600 leading-relaxed">
        “{data.message}”
      </p>
    </motion.div>
  );
};

export default TestimonialCard;
