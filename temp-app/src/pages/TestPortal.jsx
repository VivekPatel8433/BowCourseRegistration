import React from "react";
import { Link } from "react-router-dom";

export default function TestPortal() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">
        ✅ Student Portal Check
      </h1>
      <p className="text-gray-700 mb-8">
        If you can see this page, your routing is working perfectly.
      </p>
      <div className="space-x-4">
        <Link
          to="/signup"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          Go to Signup
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Go to Login
        </Link>
        <Link
          to="/student-dashboard"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
