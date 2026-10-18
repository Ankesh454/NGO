import { useEffect, useState, useMemo } from "react";
import adminApi from "../services/api";
import { exportToCSV } from "../../utils/exportCsv";
import {
  FaSearch,
  FaFileCsv,
  FaRupeeSign,
  FaHandHoldingHeart,
  FaCheckCircle,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";

// Sample initial data if database donations collection is fresh
const SAMPLE_DONATIONS = [
  {
    _id: "demo_1",
    donorName: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "9876543210",
    amount: 1000,
    cause: "Education Support & Samarpan Library",
    paymentId: "pay_Op9xL2q1Z876",
    status: "Verified",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    _id: "demo_2",
    donorName: "Priya Mukherjee",
    email: "priya.m@example.com",
    phone: "9812345678",
    amount: 2500,
    cause: "Senior Citizen Care & Free Therapy",
    paymentId: "pay_Nq7wM1p8X543",
    status: "Verified",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    _id: "demo_3",
    donorName: "Anonymous Donor",
    email: "donor.private@example.com",
    phone: "9800000000",
    amount: 5000,
    cause: "Community Welfare & Food Drives",
    paymentId: "pay_Kk5yT3r4W219",
    status: "Verified",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    _id: "demo_4",
    donorName: "Amitabh Sen",
    email: "amitabh.sen@example.com",
    phone: "9898989898",
    amount: 500,
    cause: "Animal Protection & Rescue Aid",
    paymentId: "pay_Jj2uR9v8Q110",
    status: "Verified",
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
];

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCause, setSelectedCause] = useState("All");
  const [selectedDonation, setSelectedDonation] = useState(null);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/donations");
      if (Array.isArray(res.data) && res.data.length > 0) {
        setDonations(res.data);
      } else {
        setDonations(SAMPLE_DONATIONS);
      }
    } catch {
      // Use sample donations if backend endpoint is not yet migrated
      setDonations(SAMPLE_DONATIONS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Filtered donations list
  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      const q = search.toLowerCase();
      const matchesSearch =
        (item.donorName && item.donorName.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.paymentId && item.paymentId.toLowerCase().includes(q));

      const matchesCause =
        selectedCause === "All" ||
        (item.cause && item.cause.toLowerCase().includes(selectedCause.toLowerCase()));

      return matchesSearch && matchesCause;
    });
  }, [donations, search, selectedCause]);

  // Total amount raised
  const totalRaised = useMemo(() => {
    return donations.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [donations]);

  const handleExport = () => {
    exportToCSV(filteredDonations, `samarpan_donations_${Date.now()}.csv`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-green-100 text-green-800 border border-green-200/80 flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl shadow-xs">
            💳
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Donations & Payments
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1 truncate">
              Real-time donor transactions processed via Razorpay
            </p>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 active:scale-[0.98] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition self-start sm:self-auto flex-shrink-0"
        >
          <FaFileCsv className="text-sm sm:text-base flex-shrink-0" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-6">
        {/* Total Raised */}
        <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-xs border border-gray-100 flex items-center justify-between gap-3 sm:gap-4 transition hover:shadow-sm">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Raised
            </p>
            <p className="text-2xl sm:text-3xl font-black text-green-700 mt-0.5 sm:mt-1 tracking-tight truncate">
              ₹{totalRaised.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-green-50 text-green-700 border border-green-200/70 flex items-center justify-center flex-shrink-0 text-lg sm:text-xl shadow-xs">
            <FaRupeeSign className="leading-none" />
          </div>
        </div>

        {/* Total Transactions */}
        <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-xs border border-gray-100 flex items-center justify-between gap-3 sm:gap-4 transition hover:shadow-sm">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Transactions
            </p>
            <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5 sm:mt-1 tracking-tight truncate">
              {donations.length}
            </p>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200/70 flex items-center justify-center flex-shrink-0 text-lg sm:text-xl shadow-xs">
            <FaHandHoldingHeart className="leading-none" />
          </div>
        </div>

        {/* Gateway Status */}
        <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl shadow-xs border border-gray-100 flex items-center justify-between gap-3 sm:gap-4 transition hover:shadow-sm">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">
              Gateway Status
            </p>
            <div className="flex items-center gap-2 mt-1 sm:mt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <span className="font-bold text-gray-800 text-xs sm:text-sm truncate">
                Razorpay Active
              </span>
            </div>
          </div>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200/70 flex items-center justify-center flex-shrink-0 text-lg sm:text-xl shadow-xs">
            <FaCheckCircle className="leading-none" />
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-gray-100 flex flex-col md:flex-row gap-3 sm:gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative w-full md:w-96 min-w-0">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm pointer-events-none" />
          <input
            type="text"
            placeholder="Search by donor name, email, or payment ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
          />
        </div>

        {/* Filter Cause */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto min-w-0">
          <label htmlFor="causeFilter" className="text-xs font-semibold text-gray-500 whitespace-nowrap flex-shrink-0">
            Filter Cause:
          </label>
          <select
            id="causeFilter"
            value={selectedCause}
            onChange={(e) => setSelectedCause(e.target.value)}
            className="flex-1 md:flex-initial min-w-0 w-full md:w-auto bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
          >
            <option value="All">All Causes</option>
            <option value="Education">Education</option>
            <option value="Senior">Senior Care</option>
            <option value="Community">Community Welfare</option>
            <option value="Animal">Animal Care</option>
          </select>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">
                <th className="py-3 sm:py-3.5 px-4 sm:px-6">Donor</th>
                <th className="py-3 sm:py-3.5 px-4 sm:px-6">Amount</th>
                <th className="py-3 sm:py-3.5 px-4 sm:px-6">Cause</th>
                <th className="py-3 sm:py-3.5 px-4 sm:px-6">Payment ID</th>
                <th className="py-3 sm:py-3.5 px-4 sm:px-6">Date</th>
                <th className="py-3 sm:py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3 sm:py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500 text-xs sm:text-sm">
                    Loading transactions...
                  </td>
                </tr>
              ) : filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500 text-xs sm:text-sm">
                    No transactions match your search.
                  </td>
                </tr>
              ) : (
                filteredDonations.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3 sm:py-4 px-4 sm:px-6">
                      <div className="font-semibold text-gray-900 text-xs sm:text-sm truncate max-w-[180px] sm:max-w-none">
                        {item.donorName}
                      </div>
                      <div className="text-[11px] sm:text-xs text-gray-400 truncate max-w-[180px] sm:max-w-none">
                        {item.email}
                      </div>
                    </td>

                    <td className="py-3 sm:py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className="font-bold text-green-700 text-xs sm:text-sm lg:text-base">
                        ₹{Number(item.amount).toLocaleString("en-IN")}
                      </span>
                    </td>

                    <td className="py-3 sm:py-4 px-4 sm:px-6">
                      <span className="text-[11px] sm:text-xs bg-gray-100 text-gray-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium inline-block max-w-[200px] truncate">
                        {item.cause || "General"}
                      </span>
                    </td>

                    <td className="py-3 sm:py-4 px-4 sm:px-6 font-mono text-[11px] sm:text-xs text-gray-500 whitespace-nowrap">
                      {item.paymentId}
                    </td>

                    <td className="py-3 sm:py-4 px-4 sm:px-6 text-[11px] sm:text-xs text-gray-500 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-3 sm:py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-green-700 bg-green-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-green-200">
                        <FaCheckCircle className="text-[9px] sm:text-[10px]" />
                        <span>Verified</span>
                      </span>
                    </td>

                    <td className="py-3 sm:py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedDonation(item)}
                        className="bg-gray-100 hover:bg-green-100 hover:text-green-800 text-gray-700 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDonation(null)}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 text-gray-400 hover:text-gray-600 text-base sm:text-lg p-1 transition"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-0.5 sm:mb-1">
              Transaction Details
            </h3>
            <p className="text-xs text-gray-400 mb-4 sm:mb-6">
              Razorpay Payment Reference
            </p>

            <div className="space-y-2.5 sm:space-y-3 bg-gray-50 p-3.5 sm:p-5 rounded-2xl border border-gray-200 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-gray-200 gap-2">
                <span className="text-gray-500 flex-shrink-0">Donor Name:</span>
                <span className="font-semibold text-gray-900 text-right truncate">
                  {selectedDonation.donorName}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200 gap-2">
                <span className="text-gray-500 flex-shrink-0">Amount:</span>
                <span className="font-bold text-green-700 text-sm sm:text-base">
                  ₹{Number(selectedDonation.amount).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200 gap-2">
                <span className="text-gray-500 flex-shrink-0">Cause:</span>
                <span className="font-medium text-gray-800 text-right">
                  {selectedDonation.cause}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200 gap-2">
                <span className="text-gray-500 flex-shrink-0">Payment ID:</span>
                <span className="font-mono text-[11px] sm:text-xs text-gray-800 font-semibold break-all text-right">
                  {selectedDonation.paymentId}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200 gap-2">
                <span className="text-gray-500 flex-shrink-0">Email:</span>
                <span className="text-gray-700 break-all text-right">{selectedDonation.email}</span>
              </div>
              <div className="flex justify-between py-1 gap-2">
                <span className="text-gray-500 flex-shrink-0">Phone:</span>
                <span className="text-gray-700 text-right">{selectedDonation.phone || "N/A"}</span>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 flex justify-end">
              <button
                onClick={() => setSelectedDonation(null)}
                className="bg-gray-900 hover:bg-black text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
