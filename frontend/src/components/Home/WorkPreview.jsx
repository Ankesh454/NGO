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

    
      <section className="bg-[#f6faf7] py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-extrabold tracking-tight text-emerald-950 sm:text-4xl"
        >
          Support that meets real needs
        </motion.h2>

        <p className="mx-auto mt-4 mb-11 max-w-2xl text-center text-base leading-7 text-slate-600">
          We focus on practical programmes that help people, strengthen communities,
          and create care that lasts.
        </p>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-16">
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
