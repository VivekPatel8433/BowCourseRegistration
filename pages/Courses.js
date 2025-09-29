import React from "react";
import CourseCard from "../components/CourseCard";

function Courses({ courses }) {
  return (
    <div style={{ padding: "20px" }}>
      <h3>Available Courses</h3>
      {courses.map((c, i) => (
        <CourseCard key={i} course={c} />
      ))}
    </div>
  );
}

export default Courses;
