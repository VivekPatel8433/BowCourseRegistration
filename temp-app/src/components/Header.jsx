// src/components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLogOut, FiChevronDown } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ currentUser, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Check which link is active
  const isActive = (path) => location.pathname === path;

  // Navigate safely
  const handleProtectedNav = (path) => {
    if (!currentUser) {
      alert("Please sign in to access this page.");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        {/* ---------- LEFT: Logo + Title ---------- */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4221/4221419.png"
            alt="Logo"
            className="w-9 h-9"
          />
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              BowCourseRegistration
            </h1>
            <p className="text-xs text-gray-500 -mt-1">
              Software Development Department
            </p>
          </div>
        </div>

        {/* ---------- CENTER: Nav Links ---------- */}
        <nav className="flex space-x-10 font-medium text-gray-700">
          <button
            onClick={() => handleProtectedNav("/dashboard")}
            className={`relative transition duration-200 ${
              isActive("/dashboard")
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => handleProtectedNav("/courses")}
            className={`relative transition duration-200 ${
              isActive("/courses")
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Courses
          </button>

          <button
            onClick={() => handleProtectedNav("/profile")}
            className={`relative transition duration-200 ${
              isActive("/profile")
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Profile
          </button>

          <Link
            to="/contact"
            className={`relative transition duration-200 ${
              isActive("/contact")
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* ---------- RIGHT: Account / Auth Section ---------- */}
        <div className="flex items-center space-x-5 relative" ref={dropdownRef}>
          {currentUser ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 hover:text-blue-600 transition"
              >
                <FaUserCircle className="text-gray-600 w-6 h-6" />
                <span className="text-sm font-medium text-gray-800">
                  {currentUser.username || "Student"}
                </span>
                <FiChevronDown
                  className={`transform transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                  <button
                    onClick={() => {
                      handleProtectedNav("/profile");
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      handleProtectedNav("/dashboard");
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    My Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleProtectedNav("/courses");
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    My Courses
                  </button>
                  <button
                    onClick={() => {
                      alert("Settings page coming soon!");
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onLogout();
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
