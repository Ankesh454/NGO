import { motion } from "framer-motion";
import TeamCard from "./TeamCard";


import TechImg from "../../assets/teams/TechImg.webp";
import FounderImg from "../../assets/teams/FoundImg.webp";
import EventImg from "../../assets/teams/EventImg.webp";
import volImg from "../../assets/teams/volImg.webp";


const teamMembers = [
  {
    name: "Pranjal Patel",
    role: "Technology & Operations Lead",
    description:
      "Using technology and operations to scale impact and improve outreach.",
    image: TechImg,
  },
  {
    name: "Ashish Kumar Kol",
    role: "Founder & President",
    description: "Leads the vision for helping communities.",
    image: FounderImg,
  },
  {
    name: "Nikhil Singh Patel",
    role: "Event Manager",
    description: "Plans and executes awareness campaigns.",
    image: EventImg,
  },
  {
    name: "Amit Mehta",
    role: "Treasurer",
    description: "Manages donations and financial transparency.",
    image: volImg,
  },
];

const TeamSection = () => {
  return (
    <section className="bg-[#FFF6E9] py-18">
      {/* Title */}
      <motion.h2
        className="text-3xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Meet Our Team
      </motion.h2>

      {/* Desktop Grid */}
      <div className="hidden md:grid max-w-6xl mx-auto px-6 grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>

      {/* Mobile Swipe */}
      <div className="md:hidden px-4">
        <motion.div
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          drag="x"
          dragConstraints={{ left: -300, right: 0 }}
          dragElastic={0.2}
        >
          {teamMembers.map((member, index) => (
            <div key={index} className="min-w-[80%] snap-center">
              <TeamCard {...member} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
