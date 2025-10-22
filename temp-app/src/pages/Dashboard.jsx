// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = ({ currentUser }) => {
  const navigate = useNavigate();

  // 🔹 Secure navigation handler
  const handleProtectedNav = (path) => {
    if (!currentUser) {
      alert("Please sign in to access this section.");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gradient-to-br from-blue-100 to-blue-200">
        <h1 className="text-4xl font-bold text-blue-800 mb-3 flex items-center">
          🎓 Student Dashboard
        </h1>
        <p className="text-gray-700 mb-10 max-w-2xl">
          Welcome back! From here you can manage your profile, register for
          courses, and explore term selections — all from one place.
        </p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => handleProtectedNav("/courses")}
            className="bg-blue-600 text-white py-8 rounded-lg text-xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            📘 My Courses
          </button>

          <button
            onClick={() => handleProtectedNav("/term-selection")}
            className="bg-green-600 text-white py-8 rounded-lg text-xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            🗓️ Term Selection
          </button>

          <button
            onClick={() => handleProtectedNav("/course-registration")}
            className="bg-yellow-500 text-white py-8 rounded-lg text-xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            📄 Course Registration
          </button>

          <button
            onClick={() => handleProtectedNav("/search-courses")}
            className="bg-purple-600 text-white py-8 rounded-lg text-xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            🔍 Search Courses
          </button>

          <button
            onClick={() => handleProtectedNav("/profile")}
            className="bg-indigo-600 text-white py-8 rounded-lg text-xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            👤 Profile
          </button>

          <button
            onClick={() => handleProtectedNav("/contact-admin")}
            className="bg-red-600 text-white py-8 rounded-lg text-xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            ✉️ Contact Admin
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
