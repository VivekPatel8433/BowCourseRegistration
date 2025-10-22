// src/components/Sidebar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaCalendarAlt,
  FaBook,
  FaSearch,
  FaEnvelope,
} from "react-icons/fa";

const Sidebar = ({ currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Check active link
  const isActive = (path) => location.pathname === path;

  // 🔹 Handle navigation securely
  const handleProtectedNav = (path) => {
    if (!currentUser) {
      alert("Please sign in to access this section.");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <aside className="w-64 bg-white border-r shadow-sm min-h-screen p-6">
      {/* ---------- LOGO / TITLE ---------- */}
      <div
        className="flex items-center space-x-2 mb-8 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/4221/4221419.png"
          alt="Logo"
          className="w-9 h-9"
        />
        <div>
          <h2 className="font-bold text-gray-800 leading-tight">
            BowCourse_Registration
          </h2>
          <p className="text-xs text-gray-400 -mt-1">
            Software Development Department
          </p>
        </div>
      </div>

      {/* ---------- NAV LINKS ---------- */}
      <nav className="space-y-2">
        <button
          onClick={() => handleProtectedNav("/dashboard")}
          className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition-colors ${
            isActive("/dashboard")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </button>

        <button
          onClick={() => handleProtectedNav("/profile")}
          className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition-colors ${
            isActive("/profile")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          <FaUser className="mr-3" />
          Profile
        </button>

        <button
          onClick={() => handleProtectedNav("/term-selection")}
          className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition-colors ${
            isActive("/term-selection")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          <FaCalendarAlt className="mr-3" />
          Term Selection
        </button>

        <button
          onClick={() => handleProtectedNav("/course-registration")}
          className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition-colors ${
            isActive("/course-registration")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          <FaBook className="mr-3" />
          Course Registration
        </button>

        <button
          onClick={() => handleProtectedNav("/search-courses")}
          className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition-colors ${
            isActive("/search-courses")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          <FaSearch className="mr-3" />
          Search Courses
        </button>

        <button
          onClick={() => handleProtectedNav("/contact-admin")}
          className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition-colors ${
            isActive("/contact-admin")
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          <FaEnvelope className="mr-3" />
          Contact Admin
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
