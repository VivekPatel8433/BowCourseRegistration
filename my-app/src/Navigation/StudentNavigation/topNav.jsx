import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { LogOutIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { label: "Dashboard", path: "/student" },
    { label: "Courses", path: "/student/course-registration" },
    { label: "Profile", path: "/student/profile" },
    { label: "Contact", path: "/student/contact-admin" },
  ];

  const Logout = () => {
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-[#2c3e50] to-[#d5d5d5] px-5 h-20 border-b border-gray-200 font-['Inter',sans-serif]">
      {/* Left Section */}
      <div className="flex items-center gap-2.5">
        <FaGraduationCap className="text-blue-600 text-[28px] min-[480px]:text-[36px] min-[768px]:text-[48px] transition-all duration-200" />
        <div className="flex flex-col">
          <h1 className="font-bold text-gray-900 text-[16px] min-[480px]:text-[20px] min-[768px]:text-[28px] m-0">
            Bow Course Registration
          </h1>
          <span className="text-gray-500 text-[12px] min-[480px]:text-[14px] min-[768px]:text-[18px]">
            Software Development Department
          </span>
        </div>
      </div>

      {/* Center Links */}
      <div className="flex gap-7">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="no-underline text-gray-700 font-medium transition-colors duration-200 hover:text-blue-600"
          >
            {item.label}
          </Link>
        ))}
      </div>

     {/* Right Section - Simplified */}
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100">
          <img 
            src={'https://i.pravatar.cc/150?'} 
            alt="Photo" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-right">
          <div className="font-semibold text-sm text-gray-900">
            Sarah Johnson
          </div>
          <div className="text-xs text-gray-500">
            Student
          </div>
        </div>
      </div>

      <div 
        className="cursor-pointer transition-colors duration-200 hover:text-red-500 ml-2"
        onClick={Logout}
      >
        <LogOutIcon />
      </div>
    </div>
    </nav>
  );
};

export default TopNav;
