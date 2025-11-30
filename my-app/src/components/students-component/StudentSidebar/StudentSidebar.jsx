import React, { useState } from "react";
import { FaHome, FaBook, FaUser, FaEnvelope, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function StudentSidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const menu = [
    { title: "Dashboard", icon: <FaHome />, path: "/Student" },
    { title: "My Courses", icon: <FaBook />, path: "/Student/courses" },
    { title: "Profile", icon: <FaUser />, path: "/Student/profile" },
    { title: "Contact Admin", icon: <FaEnvelope />, path: "/Student/contact-admin" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-indigo-700 text-white transition-all duration-300 
        ${open ? "w-64" : "w-20"} fixed top-0 left-0 shadow-lg`}
      >
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-500">
          <h1 className={`text-xl font-bold transition-all ${!open && "hidden"}`}>
            Student Portal
          </h1>
          <FaBars
            className="cursor-pointer text-white"
            onClick={() => setOpen(!open)}
          />
        </div>

        {/* Menu Items */}
        <ul className="mt-4 space-y-3 px-3">
          {menu.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-4 cursor-pointer p-3 rounded-lg hover:bg-indigo-600 transition"
              onClick={() => navigate(item.path)}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`text-sm font-medium transition-all ${!open && "hidden"}`}>
                {item.title}
              </span>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="absolute bottom-4 w-full px-3">
          <button className="w-full flex items-center gap-3 p-3 bg-indigo-600 hover:bg-red-600 rounded-lg transition text-sm"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/Home/Login");
            }}>
            <FaSignOutAlt className="text-lg" />
            <span className={`${!open && "hidden"}`}>Logout</span>
          </button>
        </div>
      </div>

      {/* Placeholder spacing so content doesn’t overlap */}
      <div className={`${open ? "w-64" : "w-20"} transition-all`}></div>
    </div>
  );
}
