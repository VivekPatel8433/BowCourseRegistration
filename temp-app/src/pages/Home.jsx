// src/pages/Home.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ currentUser }) => {
  const navigate = useNavigate();

  // 🔹 Smart redirect for protected pages
  const handleProtectedNav = (path) => {
    if (!currentUser) {
      alert("Please sign in to access this page.");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <main className="flex-grow flex flex-col justify-center items-center text-center px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to Bow Course Registration Portal
      </h2>
      <p className="text-gray-600 max-w-2xl mb-8">
        Manage your student profile, register for courses, and view your
        academic records — all in one place.
      </p>

      {currentUser ? (
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-lg"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/courses")}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition text-lg"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-lg"
          >
            Sign In to Continue
          </Link>
          <Link
            to="/signup"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition text-lg"
          >
            Create an Account
          </Link>
        </div>
      )}
    </main>
  );
};

export default Home;
