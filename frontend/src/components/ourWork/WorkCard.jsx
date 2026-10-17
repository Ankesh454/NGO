import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const WorkCard = ({ title, description, image }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white rounded-xl shadow-md p-6 text-center cursor-pointer"
      onClick={() => navigate("/our-work")}
    >
      {/* Circle Image */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 2 }}
        className="w-28 h-28 mx-auto rounded-full border-4 border-green-600 overflow-hidden flex items-center justify-center bg-gray-100"
      >
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm text-gray-400">Upload Image</span>
        )}
      </motion.div>

      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>

      <p className="mt-4 text-green-600 font-medium text-sm">
        View Details →
      </p>
    </motion.div>
  );
};

export default WorkCard;
