// src/pages/CourseRegistration.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const CourseRegistration = ({ currentUser }) => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedCourses = [
      {
        code: "SODV2201",
        name: "Web Programming",
        term: "Winter",
        description: "Learn React, Node, and how websites work.",
      },
      {
        code: "DB2202",
        name: "Database Systems",
        term: "Fall",
        description: "Introduction to SQL and database design.",
      },
      {
        code: "OOB2203",
        name: "Object-Oriented Basics",
        term: "Summer",
        description: "Learn the basics of object-oriented programming.",
      },
    ];
    setAvailableCourses(storedCourses);

    const savedEnrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(savedEnrolled);
  }, []);

  // Register for a course
  const handleRegister = (course) => {
    const alreadyRegistered = enrolledCourses.some(
      (c) => c.code === course.code
    );
    if (alreadyRegistered) {
      alert(`You are already registered for ${course.name}.`);
      return;
    }
    const updatedCourses = [...enrolledCourses, course];
    setEnrolledCourses(updatedCourses);
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));
    alert(`✅ Successfully registered for ${course.name}!`);
  };

  // Drop a course
  const handleDrop = (code) => {
    const updatedCourses = enrolledCourses.filter((c) => c.code !== code);
    setEnrolledCourses(updatedCourses);
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));
    alert(`❌ You have dropped the course.`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          📝 Course Registration
        </h2>

        {currentUser ? (
          <>
            {/* ---------- Available Courses ---------- */}
            <section className="mb-10">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Available Courses
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableCourses.map((course) => (
                  <div
                    key={course.code}
                    className="bg-white border border-gray-200 rounded-lg shadow p-5 hover:shadow-md transition"
                  >
                    <h4 className="text-lg font-bold text-blue-700 mb-1">
                      {course.code}: {course.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Term: {course.term}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {course.description}
                    </p>
                    <button
                      onClick={() => handleRegister(course)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Register
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* ---------- Enrolled Courses ---------- */}
            <section>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                My Enrolled Courses
              </h3>

              {enrolledCourses.length === 0 ? (
                <p className="text-gray-600">
                  You have not registered for any courses yet.
                </p>
              ) : (
                <ul className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <li
                      key={course.code}
                      className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      <div>
                        <h4 className="text-blue-700 font-bold">
                          {course.code}: {course.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Term: {course.term}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDrop(course.code)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                      >
                        Drop
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        ) : (
          <p className="text-gray-600">
            Please{" "}
            <a href="/login" className="text-blue-600 underline">
              log in
            </a>{" "}
            to register for courses.
          </p>
        )}
      </main>
    </div>
  );
};

export default CourseRegistration;
