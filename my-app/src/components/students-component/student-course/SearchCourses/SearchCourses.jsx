import React, { useEffect, useState } from "react";
import "./SearchCourses.css";
import { programs, courses } from "../../../../data/Admin-mock-data";
import { useStudent } from "../../../../context/StudentContext";

export default function SearchCourses({onRegister}) {
  const { selectedTerm } = useStudent(); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredCourses, setFilteredCourses] = useState([]); 
   

  useEffect(() => {
    const filtered = courses
      .filter((c) => c.term === selectedTerm)
      .slice(0, 5);
    setFilteredCourses(filtered);
  }, [selectedTerm]);


  useEffect(() => {
    if (!searchTerm) {
 
      const filtered = courses
        .filter((c) => c.term === selectedTerm)
        .slice(0, 5);
      setFilteredCourses(filtered);
      return;
    }

    const filtered = courses.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, selectedTerm]);


  return (
    <div className="sc-wrapper">
      <div className="sc-card">
        <div className="sc-header">
          <div className="sc-title">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                stroke="#2563eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3>Search Courses</h3>
          </div>
        </div>

        <div className="sc-searchbar">
          <input
            type="text"
            placeholder="Search by course name or code..."
            className="sc-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="sc-search-btn" aria-label="Search">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="sc-list">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((c) => (
              <div key={c.code} className="sc-item">
                <div className="sc-item-left">
                  <div className="course-code">
                    {c.code} - {c.name}
                  </div>
                  <div className="course-desc">{c.description}</div>

                  <div className="course-meta">
                    <div className="meta">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {c.term}
                    </div>

                    <div className="meta">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 6v6l4 2"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                        />
                      </svg>
                      {c.startDate}
                    </div>
                  </div>
                </div>

                <button className="add-btn" onClick={()=>onRegister(c.code)}>Register</button>
              </div>
            ))
          ) : (
            <p className="no-courses">No courses found for {selectedTerm}</p>
          )}
        </div>
      </div>
    </div>
  );
}
