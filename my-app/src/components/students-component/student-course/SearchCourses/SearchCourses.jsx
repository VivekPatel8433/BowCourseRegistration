import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStudent } from "../../../../context/StudentContext";

export default function SearchCourses({ onRegister }) {
  const { selectedTerm, studentInfo } = useStudent();
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  // --------------------------------------------
  // FETCH COURSES FROM BACKEND API
  // --------------------------------------------
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/courses"); 
        // backend returns array directly OR { courses: [] }
        setCourses(res.data.courses || res.data);
      } catch (err) {
        console.error(" Failed to fetch courses", err);
      }
    };

    fetchCourses();
  }, []);

  // --------------------------------------------
  // FILTER COURSES BY:
  // - Student Program
  // - Selected Term
  // - Search Query
  // --------------------------------------------
  useEffect(() => {
    if (!courses) return;

    let results = [...courses];

    // 1️⃣ Filter by student's program
    const studentProgram = studentInfo?.studentData?.program;
    if (studentProgram) {
      results = results.filter(
        (c) =>
          c.program?.name?.toLowerCase() === studentProgram.toLowerCase()
      );
    }

    // 2️⃣ Filter by selected term
    if (selectedTerm) {
      results = results.filter(
        (c) => Array.isArray(c.terms) && c.terms.includes(selectedTerm)
      );
    }

    // 3️⃣ Filter by search query
    if (query.trim()) {
      results = results.filter(
        (c) =>
          (c.name || c.CourseName || "")
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          (c.code || "").toLowerCase().includes(query.toLowerCase())
      );
    }

    setFiltered(results);
  }, [courses, query, selectedTerm, studentInfo]);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full">

      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Search Courses</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by course name or code..."
        className="w-full p-3 border rounded-lg mb-5 focus:border-blue-600 outline-none text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Course List */}
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
        {filtered.length > 0 ? (
          filtered.map((c) => (
            <div
              key={c._id || c.CourseID}
              className="border border-gray-200 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition shadow-sm"
            >
              <h3 className="text-lg font-semibold text-indigo-700">
                {c.CourseName || c.name}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {c.Description || c.description}
              </p>

              <div className="text-xs text-gray-500 mt-2 flex gap-5">
                <span>📅 {c.terms?.join(", ")}</span>
                <span>
                  ⏳ {new Date(c.startDate).toLocaleDateString()} –
                  {new Date(c.endDate).toLocaleDateString()}
                </span>
                <span>🎓 {c.credit} credits</span>
              </div>

              <button
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                onClick={() => onRegister(c._id || c.CourseID)}
              >
                Register
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">
            No courses available for {selectedTerm}.
          </p>
        )}
      </div>

    </div>
  );
}
