import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between p-4 px-6 text-white shadow-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <div className="text-2xl font-extrabold tracking-wide">
        Student<span className="text-red-800">FeedbackPortal</span>
      </div>
      
      {/* Desktop Links */}
      <ul className="hidden gap-8 text-lg font-medium md:flex">
        {["Home", "Dashboard", "Login", "Register"].map((item, idx) => (
          <li key={idx}>
            <Link
              to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className="relative group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button className="text-2xl text-white transition duration-200 hover:scale-110">☰</button>
      </div>
    </nav>
  );
}
