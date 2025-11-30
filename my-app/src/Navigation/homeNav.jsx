import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeNav = () => {
  const navItems = [
    { label: "Programs", path: "/" },
    { label: "Courses", path: "/Home/courses" },
    { label: "About", path: "/" },
    { label: "Contact", path: "/" },
    { label: "Login", path: "/Home/login" },
    { label: "Signup", path: "/Home/signup" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#2c3e50] to-[#d5d5d5] text-white flex items-center justify-between px-5 h-20 border-b border-gray-200 font-inter">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <FaGraduationCap className="text-3xl md:text-4xl lg:text-5xl text-blue-600 transition-all" />
        <div className="logo-text">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 m-0">
            Bow Course Registration
          </h1>
          <span className="text-xs md:text-sm lg:text-base text-gray-500">
            Software Development Department
          </span>
        </div>
      </div>

      {/* Navigation Links */}
     <div className="flex gap-6 relative -left-40">
        {navItems.map((item, index) => (
          <Link
            key={item.label}
            to={item.path}
            className={`
              no-underline text-gray-700 font-medium transition-colors hover:text-blue-300
              ${index >= navItems.length - 2 ? 'relative left-10' : ''}
              ${index === navItems.length - 1 ? 
                'bg-blue-600 w-16 h-6 text-blue-100 text-center rounded-full border border-black flex items-center justify-center text-xs' : 
                ''
              }
            `}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default HomeNav;
