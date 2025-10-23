import React, { useState, useEffect } from "react";
import "./CourseRegistration.css";
import {programs,courses} from '../../../../data/Admin-mock-data'
// Sample courses
const allCourses = [
  { code: "SODV101", name: "Introduction to Web Programming" },
  { code: "SODV102", name: "HTML & CSS Fundamentals" },
  { code: "SODV103", name: "JavaScript Basics" },
  { code: "SODV201", name: "Advanced Web Programming" },
  { code: "SODV202", name: "React.js Development" },
  { code: "SODV203", name: "Node.js & Express" },
];

const terms = ["Spring", "Summer", "Fall", "Winter"];

const CourseRegistration = ({ student }) => {
  const [selectedTerm, setSelectedTerm] = useState("");
  const [search, setSearch] = useState("");
  const [availableCourses, setAvailableCourses] = useState(courses);
  const [registeredCourses, setRegisteredCourses] = useState([]);

  useEffect(() => {
    const filtered = allCourses.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase())
    );
    setAvailableCourses(filtered);
  }, [search]);

  const handleAddCourse = (course) => {
    if (!selectedTerm) {
      alert("Please select a term first.");
      return;
    }
    if (registeredCourses.find((c) => c.code === course.code)) {
      alert("You have already registered for this course in this term.");
      return;
    }
    if (registeredCourses.length >= 5) {
      alert("You can register for a maximum of 5 courses.");
      return;
    }
    setRegisteredCourses([...registeredCourses, course]);
  };

  const handleRemoveCourse = (code) => {
    setRegisteredCourses(registeredCourses.filter((c) => c.code !== code));
  };

  const handleSubmit = () => {
    if (registeredCourses.length < 2) {
      alert("Please register at least 2 courses.");
      return;
    }
    console.log("Registered Courses:", registeredCourses, "Term:", selectedTerm);
    alert("Courses registered successfully!");
  };

  return (
    <div className="course-registration">
      <h2>Course Registration</h2>

      {/* Dashboard Info */}
      {student && (
        <div className="dashboard">
          <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
          <p><strong>Status:</strong> {student.status}</p>
          <p><strong>Student ID:</strong> {student.studentId}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Program:</strong> {student.program}</p>
        </div>
      )}

      {/* Term Selection */}
      <div className="term-selection">
        <h3>Select Term</h3>
        <div className="term-options">
          {terms.map((term) => (
            <button
              key={term}
              className={selectedTerm === term ? "term-btn selected" : "term-btn"}
              onClick={() => setSelectedTerm(term)}
            >
              {term}
            </button>
          ))}
        </div>
        {selectedTerm && (
          <p className="selected-term">Selected Term: <strong>{selectedTerm}</strong></p>
        )}
      </div>

      {/* Search Courses */}
      <div className="course-search">
        <input
          type="text"
          placeholder="Search by course name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Available Courses */}
      <div className="course-list">
        <h3>Available Courses</h3>
        {availableCourses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          availableCourses.map((course) => (
            <div key={course.code} className="course-card">
              <p><strong>{course.code}</strong> - {course.name}</p>
              <button onClick={() => handleAddCourse(course)}>Add</button>
            </div>
          ))
        )}
      </div>

      {/* Registered Courses */}
      <div className="registered-courses">
        <h3>Registered Courses ({registeredCourses.length})</h3>
        {registeredCourses.length === 0 ? (
          <p>No courses registered yet.</p>
        ) : (
          registeredCourses.map((course) => (
            <div key={course.code} className="course-card registered">
              <p><strong>{course.code}</strong> - {course.name}</p>
              <button onClick={() => handleRemoveCourse(course.code)}>Remove</button>
            </div>
          ))
        )}
      </div>

      <div className="submit-registration">
        <button onClick={handleSubmit}>Submit Registration</button>
      </div>
    </div>
  );
};

export default CourseRegistration;
