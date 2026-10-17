import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const WorkCard = ({ title, description, image }) => (
  <motion.article
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 240, damping: 20 }}
    className="group overflow-hidden rounded-2xl border border-emerald-950/8 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-emerald-950/10"
  >
    <div className="aspect-[4/3] overflow-hidden bg-emerald-100">
      <img src={image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
    </div>
    <div className="p-6">
      <h3 className="text-lg font-extrabold text-emerald-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <Link to="/our-work" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition group-hover:text-emerald-800">
        Learn more <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </motion.article>
);

export default WorkCard;
