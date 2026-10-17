import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

import educationImg from "../assets/placeholders/education.webp";
import communityImg from "../assets/placeholders/community.webp";
import seniorImg from "../assets/placeholders/senior.webp";
import animalImg from "../assets/placeholders/animal.webp";

const workItems = [
  {
    title: "Education Support",
    image: educationImg,
    description:
      "We empower children and youth by providing access to quality education, learning resources, mentorship, and awareness programs. Our Mannat Library offers free access to books and learning materials, helping students grow academically and build confidence for a better future.",
  },
  {
    title: "Community Welfare",
    image: communityImg,
    description:
      "Our community welfare initiatives support families with essential needs such as food assistance, healthcare awareness, and social support programs. We work closely with communities to promote healthier living and long-term self-reliance.",
  },
  {
    title: "Senior Citizen Care",
    image: seniorImg,
    description:
      "We ensure dignity and care for senior citizens through emotional support, health assistance, and free psychotherapy services. Our programs focus on mental well-being, companionship, and improving quality of life for the elderly.",
  },
  {
    title: "Animal Care",
    image: animalImg,
    description:
      "Our animal care initiatives focus on protection, shelter, medical aid, and awareness for animal welfare. We work to create a safe and compassionate environment for animals in need.",
  },
];

export default function OurWork() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <SEO
        title="Our Work"
        description="Discover Mannat Foundation initiatives in Education Support, Community Welfare, Senior Citizen Care, and Animal Welfare."
        url="https://mannatfoundation.org/our-work"
      />
       <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
      <h2 className="text-3xl font-bold text-center mb-3 mt-4">
        Our <span className="text-green-700">Work</span></h2>
        
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
        Our work focuses on meaningful initiatives designed to create positive
        and lasting change within communities.
      </p>
      </motion.div> 

      <div className="space-y-12">
        {workItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`grid md:grid-cols-2  items-center p-6 rounded-2xl ${
              index % 2 === 1 ? "bg-green-50" : "bg-green-50"
            }`}
          >
            {/* Image */}
            <div className="flex justify-center">
              <div className="w-44 h-44 rounded-full border-4 border-green-500 shadow-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {item.description}
              </p>

              <Link
                to="/donate"
                className="inline-block border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition"
              >
                Donate for this Cause
              </Link>
            </div>
            
          </motion.div>
         
        ))}
      </div>
      {/* CTA SECTION – END OF OUR WORK */}
<section className="max-w-6xl mx-auto px-6 mt-20 mb-24">
  <div className="bg-green-50 rounded-2xl py-12 px-8 text-center">
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
      Together, We Can Create Impact
    </h2>

    <p className="mt-4 max-w-3xl mx-auto text-gray-600 leading-relaxed">
      Our initiatives are driven by compassion, collaboration, and a strong
      commitment to community development. With your support, we can continue
      to expand our efforts and reach more lives.
    </p>
  </div>
</section>

    </section>
  );
}

