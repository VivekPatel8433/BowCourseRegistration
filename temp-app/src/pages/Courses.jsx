import React from "react";

function Courses() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center py-10">
      <h2 className="text-4xl font-bold text-blue-700 mb-6">📘 Browse Courses</h2>
      <p className="text-gray-700 mb-8 max-w-xl text-center">
        Below is a list of available courses for this semester. You can select a course to learn more or register.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4">
        {[
          { name: "Introduction to Programming", code: "CS101", desc: "Learn programming basics using JavaScript." },
          { name: "Web Development Fundamentals", code: "WD201", desc: "Understand front-end technologies like HTML, CSS, and React." },
          { name: "Database Design", code: "DB301", desc: "Explore relational databases and SQL." },
          { name: "Software Project Management", code: "PM401", desc: "Manage IT projects effectively with Agile principles." }
        ].map((course, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-blue-200 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-800">{course.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{course.code}</p>
            <p className="text-gray-600 mb-4">{course.desc}</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
