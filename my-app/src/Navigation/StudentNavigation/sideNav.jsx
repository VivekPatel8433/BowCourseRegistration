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
    <aside className="app-background side-nav">
      <ul>
        {sideNav.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "side-link active" : "side-link")}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideNav;
