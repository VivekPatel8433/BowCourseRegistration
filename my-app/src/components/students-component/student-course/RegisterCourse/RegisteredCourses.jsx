import React, { useEffect } from "react";
import "./RegisteredCourses.css";
import { courses } from "../../../../data/Admin-mock-data";

export default function RegisteredCourses({ registeredCourses,onRemoveCourse }) {

  const filteredCourses = courses.filter((c) =>
    registeredCourses.includes(c.code)
  );
   return (
    <div className="registered-courses">
      <div className="rcard">
        <div className="rcard-header">
          <div className="header-left">
            <div className="icon-box">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 4h10v14H6z"
                  fill="#0ea5e9"
                  opacity="0.15"
                />
                <path
                  d="M7 5h9v12H7z"
                  stroke="#0284c7"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8h6"
                  stroke="#0284c7"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Registered Courses</h3>
          </div>
          <span className="course-count">
            {filteredCourses.length}/5 courses
          </span>
        </div>

        <div className="course-list">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.code} className="rcourse-item">
                <div className="course-info">
                  <span className="course-code">{course.code}</span>
                  <span className="course-title">{course.name}</span>
                </div>
                <button className="remove-btn" aria-label="Remove course" onClick={()=>onRemoveCourse(course.code)}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="no-courses">No registered courses yet</p>
          )}

          <button className="add-course-btn">
            <span className="plus">+</span>
            <span>
              Add Course <small>(2 more available)</small>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
