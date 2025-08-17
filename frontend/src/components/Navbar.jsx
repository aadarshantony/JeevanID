import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed bg-white/90 top-4 left-1/2 transform -translate-x-1/2 w-[90%] border border-gray-300 backdrop-blur-md shadow-lg rounded-xl px-6 py-3 z-50">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto bg-white">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-orange-600 font-bold text-2xl flex items-center gap-2"
        >
          <img src="jeevanIdLogo.png" alt="JeevanID" className="h-8" />
          JeevanID
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/register" className="hover:text-orange-500 transition">
            Register
          </Link>
          <Link to="/report" className="hover:text-orange-500 transition">
            Report
          </Link>
          <Link to="/dashboard" className="hover:text-orange-500 transition">
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full mt-3 left-0 w-full bg-white shadow-md rounded-lg flex flex-col items-center gap-4 py-6 md:hidden">
          <Link
            to="/register"
            className="hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
          <Link
            to="/report"
            className="hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Report
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-orange-500"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
