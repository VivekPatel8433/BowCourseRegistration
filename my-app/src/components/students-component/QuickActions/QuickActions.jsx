import React from "react";
import { FaUser, FaBook, FaEnvelope, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function QuickActions({ progressBar }) {
  const navigate = useNavigate();
  
  const ViewProfile = () => {
    navigate("/Student/profile");
  };
  
  const contactAdmin = () => {
    navigate("/Student/contact-admin");
  };

  return (
    <div className="w-80 rounded-xl shadow-sm font-['Inter',sans-serif] p-0 overflow-hidden relative top-8 left-60">
      {/* Title */}
      <h2 className="text-lg font-bold p-4 border-b border-gray-200 text-gray-900">
        Quick Actions
      </h2>

      {/* Actions */}
      <div className="flex flex-col py-3">
        <button 
          className="flex items-center gap-2.5 px-4 py-3 bg-blue-50 border-none outline-none cursor-pointer text-sm text-blue-800 transition-colors hover:bg-gray-100"
          onClick={ViewProfile}
        >
          <FaUser className="text-base" />
          <span>View Profile</span>
        </button>

        <button className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 border-none outline-none cursor-pointer text-sm text-gray-700 transition-colors hover:bg-gray-100">
          <FaBook className="text-base" />
          <span>Course Registration</span>
        </button>

        <button 
          className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 border-none outline-none cursor-pointer text-sm text-gray-700 transition-colors hover:bg-gray-100"
          onClick={contactAdmin}
        >
          <FaEnvelope className="text-base" />
          <span>Contact Admin</span>
        </button>

        <button className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 border-none outline-none cursor-pointer text-sm text-gray-700 transition-colors hover:bg-gray-100">
          <FaDownload className="text-base" />
          <span>Download Schedule</span>
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mx-4" />

      {/* Status Section */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          Registration Status
        </h3>
        <p className="my-1 text-gray-700 text-sm">
          Courses Registered: <strong>{`${progressBar?.length}/5`}</strong>
        </p>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-gray-200 rounded my-2">
          <div 
            className="h-full bg-blue-500 rounded transition-all duration-300"
            style={{ width: `${(progressBar?.length / 5) * 100}%` }}
          ></div>
        </div>

        <p className="text-gray-500 text-xs mt-1.5">
          You can register for {5-progressBar?.length} more courses this term
        </p>
      </div>
    </div>
  );
}