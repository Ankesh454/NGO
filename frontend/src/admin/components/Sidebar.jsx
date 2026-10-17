import { NavLink, useNavigate } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition text-sm font-semibold ${
    isActive ? "bg-green-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-800 hover:text-white"
  }`;

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between">
      <div>
        <div className="mb-8 pb-4 border-b border-gray-800">
          <h2 className="text-xl font-extrabold text-white">Mannat Admin</h2>
          <p className="text-xs text-green-400 mt-0.5">Management Portal</p>
        </div>

        <nav className="space-y-1.5 flex-1">
          <NavLink to="/admin" end className={linkClass}>
            <span>📊</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/donations" className={linkClass}>
            <span>💳</span>
            <span>Donations</span>
          </NavLink>
          <NavLink to="/admin/contacts" className={linkClass}>
            <span>📩</span>
            <span>Contacts</span>
          </NavLink>
          <NavLink to="/admin/join-us" className={linkClass}>
            <span>🙋</span>
            <span>Join Requests</span>
          </NavLink>
          <NavLink to="/admin/gallery" className={linkClass}>
            <span>🖼️</span>
            <span>Gallery</span>
          </NavLink>
        </nav>
      </div>

      {/* 🔴 Logout */}
      <button
        onClick={logout}
        className="mt-6 bg-red-600/90 hover:bg-red-700 text-white py-2.5 px-4 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2"
      >
        <span>Logout</span>
      </button>
    </aside>
  );
}
