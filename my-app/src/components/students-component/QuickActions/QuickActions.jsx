import React from "react";
import { FaUser, FaBook, FaEnvelope, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function QuickActions({ progressBar }) {
  const navigate = useNavigate();

  const ViewProfile = () => navigate("/Student/profile");
  const contactAdmin = () => navigate("/Student/contact-admin");

  return (
    <div className="w-full max-w-xs bg-white rounded-xl shadow-sm p-0 overflow-hidden">

      {/* Header */}
      <h2 className="text-lg font-bold p-4 border-b border-gray-200">
        Quick Actions
      </h2>

      {/* Action Buttons */}
      <div className="flex flex-col py-3">

        <button
          className="px-4 py-3 flex items-center gap-2 bg-blue-50 hover:bg-gray-100"
          onClick={ViewProfile}
        >
          <FaUser className="text-blue-600" />
          <span>View Profile</span>
        </button>

        <button className="px-4 py-3 flex items-center gap-2 bg-gray-50 hover:bg-gray-100">
          <FaBook className="text-indigo-600" />
          <span>Course Registration</span>
        </button>

        <button
          className="px-4 py-3 flex items-center gap-2 bg-gray-50 hover:bg-gray-100"
          onClick={contactAdmin}
        >
          <FaEnvelope className="text-green-600" />
          <span>Contact Admin</span>
        </button>

        <button className="px-4 py-3 flex items-center gap-2 bg-gray-50 hover:bg-gray-100">
          <FaDownload className="text-purple-600" />
          <span>Download Schedule</span>
        </button>

      </div>

      {/* Divider + Registration Status */}
      <div className="border-t border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-1">
          Registration Status
        </h3>

        <p className="text-sm text-gray-700">
          Courses Registered:{" "}
          <strong>{progressBar?.length}/5</strong>
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded h-1.5 my-2">
          <div
            className="bg-blue-500 h-full rounded transition-all"
            style={{ width: `${(progressBar?.length / 5) * 100}%` }}
          ></div>
        </div>

        <p className="text-xs text-gray-500">
          You can register {5 - progressBar?.length} more courses.
        </p>
      </div>

    </div>
  );
}
