// src/pages/TermSelection.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const TermSelection = ({ currentUser }) => {
  const [selectedTerm, setSelectedTerm] = useState("");

  // Load saved term from localStorage on mount
  useEffect(() => {
    const savedTerm = localStorage.getItem("selectedTerm");
    if (savedTerm) setSelectedTerm(savedTerm);
  }, []);

  // Handle term selection
  const handleTermChange = (event) => {
    const term = event.target.value;
    setSelectedTerm(term);
    localStorage.setItem("selectedTerm", term);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          🎓 Select Academic Term
        </h2>

        {currentUser ? (
          <>
            <p className="text-gray-600 mb-6">
              Choose the academic term you’re registering for.
            </p>

            <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
              <label className="block mb-3 font-semibold text-gray-700">
                Select Term:
              </label>
              <select
                value={selectedTerm}
                onChange={handleTermChange}
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose Term --</option>
                <option value="Fall">🍁 Fall</option>
                <option value="Winter">❄️ Winter</option>
                <option value="Summer">☀️ Summer</option>
              </select>

              {selectedTerm && (
                <div className="mt-6 text-center">
                  <p className="text-lg text-gray-800">
                    ✅ You have selected:{" "}
                    <span className="font-bold text-blue-600">
                      {selectedTerm}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-600">
            Please{" "}
            <a href="/login" className="text-blue-600 underline">
              log in
            </a>{" "}
            to select your term.
          </p>
        )}
      </main>
    </div>
  );
};

export default TermSelection;
