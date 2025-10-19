import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import "./CourseManager.css";
import {  courses as initialCourses  } from "../../../../data/Admin-mock-data";
import { useNavigate } from "react-router-dom";

export default function CourseManager() {
  const [search, setSearch] = useState("");
  const [courseList, setCourseList] = useState(initialCourses);

  const filteredCourses = courseList.filter(course =>
    course.name.toLowerCase().includes(search.toLowerCase()) ||
    course.code.toLowerCase().includes(search.toLowerCase())
  );

  const navigate=useNavigate()


  const editCourse = (courseId) => {
  if (!courseId) {
    console.warn("No course ID provided");
    return;
  }

  navigate("/admin/manage-courses", {
    state: {
      isEditing: true,     // a flag
      courseId: courseId   // the actual ID
    }
  });
};


  const deleteCourse = (courseId) => {
    if (!courseId) {
      console.warn("No course ID provided");
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete this course?`)) {
      console.log("Delete course:", courseId);
    
      setCourseList(prev=>prev.filter(course=>course.id !== courseId))
    
    }
  };


  return (
    <div className="courseManager">
      <h2>Search & Manage Courses</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by course name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          <FaSearch />
        </button>
      </div>

      <div className="course-list">
        {filteredCourses.slice(0,4).map(course => (
          <div className="course-card" key={course.id}>
            <div className="course-info">
              <strong>{course.code} - {course.name}</strong>
              <p>{course.description}</p>
              <div className="course-meta">
                <span className="term">📅 {course.term}</span>
                <span className="enrolled">👥 {course. enrolledStudents} enrolled</span>
              </div>
            </div>
            <div className="course-actions">
              <button className="edit" onClick={()=>editCourse(course.id)}><FaEdit /></button>
              <button className="delete" onClick={()=>deleteCourse(course.id)}><FaTrash /></button>
            </div>
          </div>
        ))}
        {filteredCourses.length === 0 && <p className="no-results">No courses found.</p>}
      </div>
    </div>
  );
}
