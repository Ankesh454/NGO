import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaUtensils,
  FaUserNurse,
  FaPaw,
  FaShieldAlt,
  FaCheck,
  FaChartPie,
} from "react-icons/fa";

const QUICK_AMOUNTS = [500, 1000, 2500, 5000, 10000];

const FUND_ALLOCATION = [
  {
    category: "Direct Program Interventions",
    percentage: 85,
    description: "Books, study libraries, food packs, senior therapy, and animal medical aid.",
    color: "bg-green-600",
  },
  {
    category: "Field Logistics & Volunteer Outreach",
    percentage: 10,
    description: "On-ground transport, emergency response logistics, and distribution camps.",
    color: "bg-emerald-500",
  },
  {
    category: "Administration & Audit Compliance",
    percentage: 5,
    description: "Annual financial audits, transparency reporting, and compliance.",
    color: "bg-teal-700",
  },
];

const ImpactCalculator = () => {
  const [amount, setAmount] = useState(2500);

  // Dynamic calculations based on unit costs
  const students = Math.max(1, Math.floor(amount / 350));
  const meals = Math.max(10, Math.floor(amount / 40));
  const seniorCheckups = Math.max(1, Math.floor(amount / 800));
  const animalsAided = Math.max(1, Math.floor(amount / 500));

  return (
    <section className="py-20 bg-gradient-to-b from-white via-green-50/40 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider mb-4">
            <FaChartPie />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            See Your <span className="text-green-700">Real-World Impact</span>
          </h2>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            Drag the slider to visualize the tangible difference your contribution creates
            for students, families, seniors, and animals in need.
          </p>
        </motion.div>

        {/* Calculator Main Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Interactive Slider & Control (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-xl border border-green-100 flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                    Contribution Amount
                  </span>
                  <div className="text-4xl md:text-5xl font-black text-green-700 tracking-tight mt-1">
                    ₹{amount.toLocaleString("en-IN")}
                  </div>
                </div>

                {/* Quick Select Buttons */}
                <div className="flex flex-wrap gap-2">
                  {QUICK_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        amount === amt
                          ? "bg-green-700 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-800"
                      }`}
                    >
                      ₹{amt.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div className="py-4">
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="250"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600 transition"
                />
                <div className="flex justify-between text-xs text-gray-400 font-semibold mt-2">
                  <span>₹500 (Minimum)</span>
                  <span>₹12,500</span>
                  <span>₹25,000+</span>
                </div>
              </div>

              {/* Live Impact Metric Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {/* Metric 1 */}
                <div className="p-4 rounded-2xl bg-green-50/70 border border-green-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                    <FaBookOpen />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900">
                      {students}
                    </div>
                    <p className="text-xs font-medium text-gray-600 leading-snug">
                      Students provided study kits & library access
                    </p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                    <FaUtensils />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900">
                      {meals}
                    </div>
                    <p className="text-xs font-medium text-gray-600 leading-snug">
                      Warm, nutritious meals served to underserved families
                    </p>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                    <FaUserNurse />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900">
                      {seniorCheckups}
                    </div>
                    <p className="text-xs font-medium text-gray-600 leading-snug">
                      Senior citizen mental well-being & healthcare checkups
                    </p>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                    <FaPaw />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900">
                      {animalsAided}
                    </div>
                    <p className="text-xs font-medium text-gray-600 leading-snug">
                      Rescued animals fed, sheltered, and medically treated
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Donate Button with amount */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                <FaShieldAlt className="text-green-600" />
                <span>Verified 100% direct community transfer</span>
              </span>
              <Link
                to="/donate"
                className="w-full sm:w-auto px-8 py-3.5 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold shadow-lg transition flex items-center justify-center gap-2 group"
              >
                <span>Contribute ₹{amount.toLocaleString("en-IN")} Now</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Fund Transparency Breakdown (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <FaShieldAlt className="text-green-600 text-xl" />
                <h3 className="text-xl font-extrabold text-gray-900">
                  Where Does Your Money Go?
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                We maintain an open-book policy. Every rupee donated is audited and accounted for with maximum efficiency.
              </p>

              {/* Progress Bar Visual */}
              <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex shadow-inner mb-6">
                <div
                  style={{ width: "85%" }}
                  className="bg-green-600 transition-all duration-500"
                  title="85% Direct Programs"
                />
                <div
                  style={{ width: "10%" }}
                  className="bg-emerald-400 transition-all duration-500"
                  title="10% Field Logistics"
                />
                <div
                  style={{ width: "5%" }}
                  className="bg-teal-700 transition-all duration-500"
                  title="5% Admin & Compliance"
                />
              </div>

              {/* Breakdown List */}
              <div className="space-y-4">
                {FUND_ALLOCATION.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-green-200 transition"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="font-bold text-gray-900 text-sm">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-base font-extrabold text-green-700">
                        {item.percentage}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 pl-5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee Tag */}
            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500 font-medium">
              <FaCheck className="text-green-600" />
              <span>Independent annual financial audits conducted annually.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactCalculator;
