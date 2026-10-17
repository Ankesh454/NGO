import ImpactStats from "../ourWork/ImpactStats";
import WorkCard from "../ourWork/WorkCard";
import { motion } from "framer-motion";

import educationImg from "../../assets/placeholders/education.webp";
import communityImg from "../../assets/placeholders/community.webp";
import seniorImg from "../../assets/placeholders/senior.webp";
import animalImg from "../../assets/placeholders/animal.webp";

const works = [
  {
    title: "Education Support",
    description: "Providing learning resources to underprivileged children.",
    image: educationImg,
  },
  {
    title: "Community Welfare",
    description: "Food, healthcare awareness & basic needs.",
    image: communityImg,
  },
  {
    title: "Senior Citizen Care",
    description: "Care, dignity & essential services for elderly people.",
    image: seniorImg,
  },
  {
    title: "Animal Care",
    description: "Protection, shelter & medical care for animals.",
    image: animalImg,
  },
];

const WorkPreview = () => {
  return (
    <>

    
      {/* Our Work Preview */}
      <section className="py-16 bg-green-50">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center"
        >
          Our Work
        </motion.h2>

        <p className="text-center text-gray-600 mt-2 mb-10">
          We focus on meaningful initiatives that create long-term impact.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          {works.map((item, index) => (
            <WorkCard key={index} {...item} />
          ))}
        </div>
      </section>
      {/* Impact Stats ON HOME */}
      <ImpactStats />

     
    </>
  );
};

export default WorkPreview;
