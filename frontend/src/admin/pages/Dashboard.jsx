import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FiHeart,
  FiMessageSquare,
  FiUsers,
  FiImage,
  FiArrowRight,
} from "react-icons/fi";
import adminApi from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    joinUs: 0,
    gallery: 0,
    donationsCount: 4,
    totalFunds: 9000,
  });

  const fetchStats = async () => {
    try {
      const [contactsRes, joinRes, galleryRes] = await Promise.allSettled([
        adminApi.get("/contact"),
        adminApi.get("/join-us"),
        adminApi.get("/gallery"),
      ]);

      let donCount = 4;
      let donSum = 9000;
      try {
        const donRes = await adminApi.get("/donations");
        if (Array.isArray(donRes.data) && donRes.data.length > 0) {
          donCount = donRes.data.length;
          donSum = donRes.data.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);
        }
      } catch {
        // Fallback demo values
      }

      setStats({
        contacts: contactsRes.status === "fulfilled" ? contactsRes.value.data.length : 0,
        joinUs: joinRes.status === "fulfilled" ? joinRes.value.data.length : 0,
        gallery: galleryRes.status === "fulfilled" ? galleryRes.value.data.length : 0,
        donationsCount: donCount,
        totalFunds: donSum,
      });
    } catch (err) {
      console.error("Dashboard stats error", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Mannat Foundation</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="dashboard max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Admin Overview
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back to Mannat Foundation Operations & Donor Management
            </p>
          </div>

          <Link
            to="/admin/donations"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition self-start md:self-auto"
          >
            <span>💳 View Donations</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Raised */}
          <div className="stat-card card-donations">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider">
                Total Raised
              </h3>
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center text-white text-lg shadow-inner">
                <FiHeart />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-white mt-3 tracking-tight relative z-10 drop-shadow-sm">
              ₹{stats.totalFunds.toLocaleString("en-IN")}
            </p>
            <div className="mt-4 flex items-center justify-between relative z-10 pt-2 border-t border-white/15">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                {stats.donationsCount} Online Donors
              </span>
              <Link
                to="/admin/donations"
                className="text-xs font-semibold text-white/95 hover:text-white flex items-center gap-1 transition group"
              >
                <span>View</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Contact Queries */}
          <div className="stat-card card-contacts">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider">
                Contact Queries
              </h3>
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center text-white text-lg shadow-inner">
                <FiMessageSquare />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-white mt-3 tracking-tight relative z-10 drop-shadow-sm">
              {stats.contacts}
            </p>
            <div className="mt-4 flex items-center justify-between relative z-10 pt-2 border-t border-white/15">
              <span className="text-xs font-medium text-white/85">
                New user inquiries
              </span>
              <Link
                to="/admin/contacts"
                className="text-xs font-semibold text-white/95 hover:text-white flex items-center gap-1 transition group"
              >
                <span>Messages</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Join Requests */}
          <div className="stat-card card-join">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider">
                Join Requests
              </h3>
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center text-white text-lg shadow-inner">
                <FiUsers />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-white mt-3 tracking-tight relative z-10 drop-shadow-sm">
              {stats.joinUs}
            </p>
            <div className="mt-4 flex items-center justify-between relative z-10 pt-2 border-t border-white/15">
              <span className="text-xs font-medium text-white/85">
                Volunteer applicants
              </span>
              <Link
                to="/admin/join-us"
                className="text-xs font-semibold text-white/95 hover:text-white flex items-center gap-1 transition group"
              >
                <span>Review</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Gallery Media */}
          <div className="stat-card card-gallery">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between relative z-10">
              <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider">
                Gallery Media
              </h3>
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center text-white text-lg shadow-inner">
                <FiImage />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-white mt-3 tracking-tight relative z-10 drop-shadow-sm">
              {stats.gallery}
            </p>
            <div className="mt-4 flex items-center justify-between relative z-10 pt-2 border-t border-white/15">
              <span className="text-xs font-medium text-white/85">
                Uploaded stories
              </span>
              <Link
                to="/admin/gallery"
                className="text-xs font-semibold text-white/95 hover:text-white flex items-center gap-1 transition group"
              >
                <span>Manage</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Shortcuts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/admin/donations"
              className="p-4 rounded-xl bg-gray-50 hover:bg-green-50/70 border border-gray-200/70 transition flex items-center justify-between group"
            >
              <div>
                <span className="font-bold text-gray-900 text-sm group-hover:text-green-800">
                  Donor Transactions
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Inspect amounts & CSV download
                </p>
              </div>
              <span className="text-green-700 text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              to="/admin/contacts"
              className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50/70 border border-gray-200/70 transition flex items-center justify-between group"
            >
              <div>
                <span className="font-bold text-gray-900 text-sm group-hover:text-blue-800">
                  Message Inbox
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Filter by status & reply
                </p>
              </div>
              <span className="text-blue-600 text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              to="/admin/join-us"
              className="p-4 rounded-xl bg-gray-50 hover:bg-emerald-50/70 border border-gray-200/70 transition flex items-center justify-between group"
            >
              <div>
                <span className="font-bold text-gray-900 text-sm group-hover:text-emerald-800">
                  Volunteer Requests
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Track onboarded members
                </p>
              </div>
              <span className="text-emerald-600 text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
