import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const links = [
  ["About", "/about"],
  ["Our Work", "/our-work"],
  ["Gallery", "/gallery"],
  ["Join Us", "/join-us"],
  ["Contact", "/contact"],
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const useLightText = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive
        ? useLightText
          ? "text-emerald-300"
          : "text-emerald-700"
        : useLightText
          ? "text-white/85 hover:text-white"
          : "text-slate-600 hover:text-emerald-700"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        useLightText ? "bg-transparent" : "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Mannat Foundation home">
          <img src={logo} alt="" className="h-10 w-10 object-contain" />
          <span className={`text-base font-extrabold tracking-tight sm:text-lg ${useLightText ? "text-white" : "text-emerald-950"}`}>
            Mannat Foundation
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/donate"
            className="hidden items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 sm:inline-flex"
          >
            Donate now <FaArrowRight className="text-xs" />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`grid h-10 w-10 place-items-center rounded-lg text-lg lg:hidden ${
              useLightText ? "text-white hover:bg-white/10" : "text-emerald-950 hover:bg-emerald-50"
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-6 py-5 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 sm:px-4">
            {links.map(([label, to]) => (
              <NavLink key={to} to={to} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700">
                {label}
              </NavLink>
            ))}
            <Link to="/donate" className="mt-2 rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-bold text-white">
              Support the mission
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
