import React from "react";
import { FaTachometerAlt, FaUser, FaPlus, FaBook, FaUsers, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const sideNav = [
    { label: "Dashboard", icon: <FaTachometerAlt className="w-5 h-5" />, path: "/admin/dashboard" },
    { label: "Profile", icon: <FaUser className="w-5 h-5" />, path: "/admin/profile" },
    { label: "Create Course", icon: <FaPlus className="w-5 h-5" />, path: "/admin/create-course" },
    { label: "View Students", icon: <FaUsers className="w-5 h-5" />, path: "/admin/view-students" },
    { label: "Student Messages", icon: <FaEnvelope className="w-5 h-5" />, path: "/admin/messages" },
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

export default AdminSidebar;