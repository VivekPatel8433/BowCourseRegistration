import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaCalendarAlt,
  FaBook,
  FaSearch,
  FaEnvelope,
} from "react-icons/fa";
import { NavLink } from "react-router-dom"; // <-- use NavLink instead of Link
import "./SideNav.css";

const SideNav = () => {
  const sideNav = [
    { label: "Dashboard", path: "/student/dashboard", icon: <FaTachometerAlt className="icon" /> },
    { label: "Profile", path: "/student/profile", icon: <FaUser className="icon" /> },
    { label: "Term Selection", path: "/student/term-selection", icon: <FaCalendarAlt className="icon" /> },
    { label: "Course Registration", path: "/student/course-registration", icon: <FaBook className="icon" /> },
    { label: "Contact Admin", path: "/student/contact-admin", icon: <FaEnvelope className="icon" /> },
  ];

  return (
     <aside className="bg-gradient-to-b from-blue-50 to-indigo-100 w-64 h-screen p-6 shadow-lg sticky top-0">
        <ul className="space-y-3">
          {sideNav.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                    isActive 
                      ? "bg-blue-500 text-white shadow-md transform scale-105" 
                      : "text-gray-700 hover:bg-white hover:shadow-md hover:text-blue-600"
                  }`
                }
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    );
};

export default SideNav;
