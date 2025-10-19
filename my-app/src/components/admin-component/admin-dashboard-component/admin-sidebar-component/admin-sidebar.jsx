import React from "react";
import "./admin-sidebar.css";
import { FaTachometerAlt, FaUser, FaPlus, FaBook, FaUsers, FaEnvelope } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <FaTachometerAlt className="icon" />, path: "/admin/dashboard" },
    { label: "Profile", icon: <FaUser className="icon" />, path: "/admin/profile" },
    { label: "Create Course", icon: <FaPlus className="icon" />, path: "/admin/create-course" },
    { label: "Manage Courses", icon: <FaBook className="icon" />, path: "/admin/manage-courses" },
    { label: "View Students", icon: <FaUsers className="icon" />, path: "/admin/view-students" },
    { label: "Student Messages", icon: <FaEnvelope className="icon" />, path: "/admin/messages" },
  ];

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.label} className={isActive ? "active" : ""}>
              <NavLink
                to={item.path}
                style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.icon}
                <span style={{ marginLeft: "10px" }}>{item.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
