import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import testimonials from "./testimonialsData";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Our <span className="text-green-600">Testimonials</span>
        </h2>

        {/* Slider */}
        <div className="relative">
          {/* Desktop arrows */}
          <button
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-amber-200 shadow rounded-full items-center justify-center"
          >
            ←
          </button>

          <button
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-amber-200 shadow rounded-full items-center justify-center"
          >
            →
          </button>

          {/* Card */}
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={testimonials[index].id}
              data={testimonials[index]}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
