import React, { useEffect, useState } from "react";
import "./CourseOverview.css";
import { programs, courses } from "../../../data/Admin-mock-data";
import { useLocation } from "react-router-dom"; 
const terms = ["Spring", "Summer", "Fall", "Winter"];

export default function CourseOverview() {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const location= useLocation();
  const {id}=location.state||{};

  useEffect(() => {
    if (id) {
      const selectedProgram = programs.find((p) => p.id === id);
      if (selectedProgram && selectedProgram.term) {
        setSelectedTerm(selectedProgram.term);
      }
    }
  }, [id]);

  // Filter courses based on programId and selected term
  const filteredPrograms = programs .filter((program) => (id ? program.id === id : true))
    .map((program) => ({
      ...program,
      courses: courses.filter(
        (course) =>
          course.programId === program.id &&program.term === selectedTerm &&course.term === selectedTerm
      ),
    }))
    .filter((program) => program.courses.length > 0); // only keep programs with courses in term

  return (
    <section className="app-background course-overview">
      <div className="container">
        <h1>Software Development Programs & Courses</h1>

        {/* Term Dropdown */}
        <div className="term-filter">
          <label htmlFor="term-select">Select Term: </label>
          <select
            id="term-select"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>

        {/* Programs */}
        {filteredPrograms.map((program) => (
          <div className="program-card" key={program.id}>
            <div className="program-header">
              <h2>{program.name} Program</h2>
              <span className="duration">{program.duration}</span>
            </div>
            <p className="description">{program.description}</p>
            <div className="program-details">
              <span>Department: {program.department}</span>
              <span>Term: {selectedTerm}</span>
              <span>Start: {program.startDate}</span>
              <span>End: {program.endDate}</span>
              <span>Domestic Fees: {program.fees.domestic}</span>
              <span>International Fees: {program.fees.international}</span>
            </div>

            {/* Courses */}
            <div className="courses">
              <h3>Courses</h3>
              {program.courses.map((course) => (
                <div className="course-card" key={course.id}>
                  <div className="course-header">
                    <h4>
                      {course.code}: {course.name}
                    </h4>
                    <span>Term: {course.term}</span>
                  </div>
                  <p>{course.description}</p>
                  <span className="course-dates">
                    {course.startDate} - {course.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
