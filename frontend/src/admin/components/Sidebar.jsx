import { useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FiX,
  FiBarChart2,
  FiCreditCard,
  FiMail,
  FiUsers,
  FiImage,
  FiLogOut,
} from "react-icons/fi";

const NAV_LINKS = [
  { to: "/admin",           end: true, icon: FiBarChart2,  label: "Dashboard"     },
  { to: "/admin/donations",            icon: FiCreditCard, label: "Donations"     },
  { to: "/admin/contacts",             icon: FiMail,       label: "Contacts"      },
  { to: "/admin/join-us",              icon: FiUsers,      label: "Join Requests" },
  { to: "/admin/gallery",              icon: FiImage,      label: "Gallery"       },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-150 text-sm font-semibold ${
    isActive
      ? "bg-green-600 text-white shadow-md"
      : "text-gray-300 hover:bg-gray-800 hover:text-white"
  }`;

function SidebarInner({ onClose, logout }) {
  return (
    <aside className="flex h-full w-64 flex-shrink-0 flex-col justify-between bg-gray-900 p-5">
      {/* Header */}
      <div>
        <div className="mb-8 flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="min-w-0 pr-2">
            <h2 className="truncate text-base font-extrabold text-white leading-tight">
              Samarpan Admin
            </h2>
            <p className="text-xs text-green-400 mt-0.5">Management Portal</p>
          </div>
          {/* ✕ close button — only on mobile drawer */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition"
              aria-label="Close sidebar"
            >
              <FiX size={18} />
            </button>
          )}
        </div>

        <nav className="space-y-1">
          {NAV_LINKS.map(({ to, end, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              <Icon size={16} className="flex-shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600/90 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        <FiLogOut size={15} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Auto-close drawer on navigation
  useEffect(() => {
    onClose();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      {/* ── Desktop: permanent sticky sidebar ── */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="h-screen sticky top-0">
          <SidebarInner logout={logout} />
        </div>
      </div>

      {/* ── Mobile: semi-transparent backdrop ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile: slide-in drawer ── */}
      <div
        className={`fixed inset-y-0 left-0 z-50 h-full lg:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarInner onClose={onClose} logout={logout} />
      </div>
    </>
  );
}
