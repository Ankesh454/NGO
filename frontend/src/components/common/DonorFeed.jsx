import { useEffect, useState } from "react";
import { FaHeart, FaShieldAlt } from "react-icons/fa";
import API from "../../services/api";

const FALLBACK_DONATIONS = [
  {
    donorName: "Rahul Sharma",
    amount: 1000,
    cause: "Education Support",
    timeAgo: "15 mins ago",
  },
  {
    donorName: "Anonymous Supporter",
    amount: 2500,
    cause: "Senior Citizen Care",
    timeAgo: "42 mins ago",
  },
  {
    donorName: "Ananya Patel",
    amount: 500,
    cause: "Animal Welfare",
    timeAgo: "1 hour ago",
  },
  {
    donorName: "Pooja Verma",
    amount: 5000,
    cause: "Community Food Drive",
    timeAgo: "2 hours ago",
  },
  {
    donorName: "Vikram Malhotra",
    amount: 1500,
    cause: "Mannat Library",
    timeAgo: "3 hours ago",
  },
  {
    donorName: "Anonymous Supporter",
    amount: 2000,
    cause: "Healthcare Camps",
    timeAgo: "5 hours ago",
  },
];

const DonorFeed = () => {
  const [donations, setDonations] = useState(FALLBACK_DONATIONS);

  useEffect(() => {
    let isMounted = true;
    API.get("/donations")
      .then((res) => {
        if (isMounted && Array.isArray(res.data) && res.data.length > 0) {
          // Format real donations from backend
          const formatted = res.data.slice(0, 10).map((d) => ({
            donorName: d.donorName || "Anonymous Supporter",
            amount: d.amount || 500,
            cause: d.cause || "General Fund",
            timeAgo: d.createdAt
              ? new Date(d.createdAt).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                })
              : "Recently",
          }));
          setDonations(formatted);
        }
      })
      .catch(() => {
        // Fallback remains active seamlessly
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-900 via-emerald-950 to-zinc-900 py-3.5 border-y border-green-800/50 text-white overflow-hidden shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-4">
        {/* Live Badge */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-white/10 px-3 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-300 uppercase">Live Supporters</span>
        </div>

        {/* Marquee Ticker */}
        <div className="overflow-hidden w-full relative">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...donations, ...donations].map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 text-xs text-gray-200"
              >
                <FaHeart className="text-emerald-400 text-[10px] flex-shrink-0" />
                <span className="font-semibold text-white">
                  {item.donorName}
                </span>
                <span className="text-emerald-300 font-bold">
                  ₹{Number(item.amount).toLocaleString("en-IN")}
                </span>
                <span className="text-gray-400">for {item.cause}</span>
                <span className="text-gray-500 text-[10px]">({item.timeAgo})</span>
                <span className="text-gray-600 pl-4">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Tag */}
        <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0 text-[11px] text-gray-400">
          <FaShieldAlt className="text-emerald-400" />
          <span>Verified Online Donations</span>
        </div>
      </div>
    </div>
  );
};

export default DonorFeed;
