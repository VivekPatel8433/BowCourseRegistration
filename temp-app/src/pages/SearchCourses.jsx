// src/pages/SearchCourses.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const SearchCourses = ({ currentUser }) => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Load course data (from your app’s available list)
  useEffect(() => {
    const storedCourses = [
      {
        code: "SODV2201",
        name: "Web Programming",
        term: "Winter",
        department: "Software Development",
        description: "Learn React, Node, and how websites work.",
      },
      {
        code: "DB2202",
        name: "Database Systems",
        term: "Fall",
        department: "Information Technology",
        description: "Introduction to SQL and database design.",
      },
      {
        code: "OOB2203",
        name: "Object-Oriented Basics",
        term: "Summer",
        department: "Software Development",
        description: "Learn the basics of object-oriented programming.",
      },
      {
        code: "NET2204",
        name: ".NET Application Development",
        term: "Winter",
        department: "Software Development",
        description: "Build full-stack web apps using C# and .NET.",
      },
    ];
    setCourses(storedCourses);
    setFilteredCourses(storedCourses);
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const results = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(query) ||
        course.code.toLowerCase().includes(query) ||
        course.term.toLowerCase().includes(query) ||
        course.department.toLowerCase().includes(query)
    );

    setFilteredCourses(results);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">🔍 Search Courses</h2>

        {currentUser ? (
          <>
            {/* ---------- Search Bar ---------- */}
            <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
              <label className="block font-semibold text-gray-700 mb-2">
                Search by course name, code, or term:
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="e.g., Web Programming, SODV2201, Winter..."
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* ---------- Search Results ---------- */}
            <div>
              {filteredCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.code}
                      className="bg-white border border-gray-200 rounded-lg shadow p-5 hover:shadow-md transition"
                    >
                      <h3 className="text-lg font-bold text-blue-700 mb-1">
                        {course.code}: {course.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        Term: <span className="font-semibold">{course.term}</span>
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        Department:{" "}
                        <span className="font-semibold">{course.department}</span>
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {course.description}
                      </p>
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        onClick={() => alert(`Viewing details for ${course.name}`)}
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 mt-4">
                  No courses match your search. Try another keyword.
                </p>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-600">
            Please{" "}
            <a href="/login" className="text-blue-600 underline">
              log in
            </a>{" "}
            to browse and search courses.
          </p>
        )}
      </main>
    </div>
  );
};

export default SearchCourses;
