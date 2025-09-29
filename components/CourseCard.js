import React from "react";

// A simple card to show each course
function CourseCard({ course }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        margin: "10px",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <h4>{course.name}</h4>
      <p><strong>Code:</strong> {course.code}</p>
      <p><strong>Term:</strong> {course.term}</p>
      <p><em>{course.description}</em></p>
    </div>
  );
}

export default CourseCard;
