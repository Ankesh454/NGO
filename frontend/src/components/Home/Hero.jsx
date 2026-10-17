import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaHeart, FaShieldAlt, FaUsers } from "react-icons/fa";

const trustPoints = [
  { icon: FaHeart, label: "Community-led work" },
  { icon: FaShieldAlt, label: "Secure donations" },
  { icon: FaUsers, label: "Local action, lasting care" },
];

const Hero = () => {
  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-emerald-950 pt-24 sm:pt-28">
      <img
        src="/hero-bg.webp"
        alt="Children supported by Samarpan Foundation"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        loading="eager"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-emerald-950/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-950/85 via-transparent to-emerald-950/20" />

      <div className="mx-auto flex min-h-[calc(720px-6rem)] max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm font-semibold tracking-wide text-emerald-100 backdrop-blur-sm">
            <FaHeart className="text-emerald-300" /> Community-led non-profit
          </p>

          <h1 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Education. Care. <span className="text-emerald-300">Dignity.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-50/90 sm:text-xl">
            Helping communities build stronger futures through practical support,
            trusted care, and local action.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/donate"
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-400 px-6 py-4 text-base font-bold text-emerald-950 shadow-xl shadow-emerald-950/30 transition hover:bg-emerald-300"
            >
              Support the mission
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/our-work"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Explore our work
            </Link>
          </div>

          <div className="mt-12 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-3 sm:gap-6">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm font-medium text-emerald-50/85">
                <Icon className="shrink-0 text-emerald-300" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
