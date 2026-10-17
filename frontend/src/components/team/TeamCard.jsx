import { motion } from "framer-motion";

const TeamCard = ({ name, role, description, image }) => {
  return (
    <motion.div
      className="
        bg-white rounded-xl p-6 text-center
        shadow-sm
        transition-all
      "
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* Image */}
      <div className="w-28 h-28 mx-auto mb-4 rounded-full border-4 border-green-500 overflow-hidden bg-gray-100 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">Upload Image</span>
        )}
      </div>

      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-green-600 text-sm font-medium">{role}</p>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </motion.div>
  );
};

export default TeamCard;
