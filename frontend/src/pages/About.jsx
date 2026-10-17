import { motion } from "framer-motion";
import {
  FaHandsHelping,
  FaEye,
  FaBullseye,
} from "react-icons/fa";
import SEO from "../components/common/SEO";

const About = () => {
  return (
    <section className="bg-white min-h-screen">
      <SEO
        title="About Us"
        description="Learn about Mannat Foundation, our mission, vision, and grassroots initiatives for education and welfare."
        url="https://mannatfoundation.org/about"
      />
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            About <span className="text-green-700">Mannat Foundation</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
            Mannat Foundation is a non-profit organization committed to improving
            lives and empowering communities through education, awareness, and
            social welfare initiatives.
          </p>
        </motion.div>

        {/* Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We are a group of dedicated individuals who believe that meaningful
            change begins at the grassroots level. Our work focuses on addressing
            real challenges faced by underprivileged communities and creating
            sustainable solutions through collective effort and compassion.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="mt-16 grid md:grid-cols-2 gap-10">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-green-50 p-8 rounded-xl"
          >
            <FaBullseye className="text-green-700 text-3xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To support and uplift underprivileged individuals by providing
              access to education, basic resources, and opportunities that help
              them lead dignified and self-reliant lives.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 p-8 rounded-xl"
          >
            <FaEye className="text-green-700 text-3xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600">
              A society where every individual has equal opportunities to grow,
              learn, and thrive, regardless of their background or circumstances.
            </p>
          </motion.div>

        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Our Core Values
          </h2>

          <ul className="space-y-4 text-gray-600">
            <li className="flex gap-3 items-start">
              <FaHandsHelping className="text-green-700 mt-1" />
              Compassion and empathy in all our actions
            </li>
            <li className="flex gap-3 items-start">
              <FaHandsHelping className="text-green-700 mt-1" />
              Transparency and accountability
            </li>
            <li className="flex gap-3 items-start">
              <FaHandsHelping className="text-green-700 mt-1" />
              Community-driven and inclusive approach
            </li>
            <li className="flex gap-3 items-start">
              <FaHandsHelping className="text-green-700 mt-1" />
              Sustainable and long-term impact
            </li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
