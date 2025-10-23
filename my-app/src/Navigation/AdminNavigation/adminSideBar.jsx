import React from "react";
import { FaTachometerAlt, FaUser, FaPlus, FaBook, FaUsers, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // <-- use NavLink instead of Link
import "../StudentNavigation/SideNav.css"; // use the same student css

const AdminSidebar = () => {
  const sideNav =[
      { label: "Dashboard", icon: <FaTachometerAlt className="icon" />, path: "/admin/dashboard" },
      { label: "Profile", icon: <FaUser className="icon" />, path: "/admin/profile" },
      { label: "Create Course", icon: <FaPlus className="icon" />, path: "/admin/create-course" },
      { label: "View Students", icon: <FaUsers className="icon" />, path: "/admin/view-students" },
      { label: "Student Messages", icon: <FaEnvelope className="icon" />, path: "/admin/messages" },
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

export default AdminSidebar;
