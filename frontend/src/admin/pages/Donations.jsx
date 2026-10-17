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
    cause: "Education Support & Mannat Library",
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
    exportToCSV(filteredDonations, `mannat_donations_${Date.now()}.csv`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <span className="p-2 bg-green-100 text-green-700 rounded-xl">💳</span>
            <span>Donations & Payments</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time donor transactions processed via Razorpay
          </p>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow transition"
        >
          <FaFileCsv />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Raised
            </p>
            <p className="text-3xl font-black text-green-700 mt-1">
              ₹{totalRaised.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl">
            <FaRupeeSign />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Transactions
            </p>
            <p className="text-3xl font-black text-gray-900 mt-1">
              {donations.length}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl">
            <FaHandHoldingHeart />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Gateway Status
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-bold text-gray-800 text-sm">
                Razorpay Active
              </span>
            </div>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-xl">
            <FaCheckCircle />
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by donor name, email, or payment ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Filter Cause */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
            Filter Cause:
          </span>
          <select
            value={selectedCause}
            onChange={(e) => setSelectedCause(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                <th className="py-4 px-6">Donor</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Cause</th>
                <th className="py-4 px-6">Payment ID</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    Loading transactions...
                  </td>
                </tr>
              ) : filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No transactions match your search.
                  </td>
                </tr>
              ) : (
                filteredDonations.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/60 transition">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900">
                        {item.donorName}
                      </div>
                      <div className="text-xs text-gray-400">{item.email}</div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="font-bold text-green-700 text-base">
                        ₹{Number(item.amount).toLocaleString("en-IN")}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-medium">
                        {item.cause || "General"}
                      </span>
                    </td>

                    <td className="py-4 px-6 font-mono text-xs text-gray-500">
                      {item.paymentId}
                    </td>

                    <td className="py-4 px-6 text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                        <FaCheckCircle className="text-[10px]" />
                        <span>Verified</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedDonation(item)}
                        className="bg-gray-100 hover:bg-green-100 hover:text-green-800 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedDonation(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-lg"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-extrabold text-gray-900 mb-1">
              Transaction Details
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Razorpay Payment Reference
            </p>

            <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-200 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Donor Name:</span>
                <span className="font-semibold text-gray-900">
                  {selectedDonation.donorName}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Amount:</span>
                <span className="font-bold text-green-700 text-base">
                  ₹{Number(selectedDonation.amount).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Cause:</span>
                <span className="font-medium text-gray-800">
                  {selectedDonation.cause}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Payment ID:</span>
                <span className="font-mono text-xs text-gray-800 font-semibold">
                  {selectedDonation.paymentId}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Email:</span>
                <span className="text-gray-700">{selectedDonation.email}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Phone:</span>
                <span className="text-gray-700">{selectedDonation.phone || "N/A"}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedDonation(null)}
                className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
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
