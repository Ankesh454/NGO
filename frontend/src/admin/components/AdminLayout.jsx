import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 lg:flex-row">

      {/* ── Mobile top header bar (hidden on lg+) ── */}
      <header className="sticky top-0 z-30 flex items-center gap-3 bg-gray-900 px-4 py-3 shadow-md lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-gray-300 transition hover:bg-gray-800 hover:text-white"
          aria-label="Open navigation"
        >
          <FiMenu size={20} />
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold leading-tight text-white">
            Samarpan Admin
          </p>
          <p className="text-[10px] text-green-400 leading-tight">Management Portal</p>
        </div>
      </header>

      {/* ── Sidebar (desktop: permanent | mobile: drawer) ── */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Page content ── */}
      <main className="flex-1 min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
}
