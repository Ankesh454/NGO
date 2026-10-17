import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { value: 200, suffix: "+", label: "Lives Impacted" },
  { value: 15, suffix: "+", label: "Villages Reached" },
  { value: 4, suffix: "+", label: "Projects Completed" },
  { value: 1, suffix: "+", label: "States Covered" },
];

const ImpactStats = () => {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">Our Impact</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-green-600">
              {start && (
                <CountUp
                  end={item.value}
                  duration={2}
                  suffix={item.suffix}
                />
              )}
            </div>
            <p className="mt-2 text-gray-600">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;
