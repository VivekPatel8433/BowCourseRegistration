import React from "react";
import { Link } from "react-router-dom";

function Schedule() {
  const schedule = [
    { course: "Introduction to Programming", time: "Mon & Wed - 10:00 AM to 11:30 AM" },
    { course: "Web Development Fundamentals", time: "Tue & Thu - 2:00 PM to 3:30 PM" },
    { course: "Database Design", time: "Fri - 9:00 AM to 12:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center py-10">
      <h2 className="text-4xl font-bold text-green-700 mb-6">🗓️ Class Schedule</h2>
      <div className="w-3/4 md:w-2/3 lg:w-1/2 space-y-4">
        {schedule.map((cls, i) => (
          <div key={i} className="bg-white shadow-md rounded-lg p-6 border border-green-200 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-800">{cls.course}</h3>
            <p className="text-gray-700">{cls.time}</p>
          </div>
        ))}
      </div>
      <Link
        to="/dashboard"
        className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg"
      >
        ⬅ Back to Dashboard
      </Link>
    </div>
  );
}

export default Schedule;
