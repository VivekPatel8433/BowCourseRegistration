import React, { useState } from "react";
import "./create-course.css";
import { programs, courses } from "../../../../data/Admin-mock-data";

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    instructor: "",
    startDate: "",
    endDate: "",
    credits: 3,
    maxStudents: 30,
    department: "Software Development",
    level: "",
    status: "active",
    prerequisites: [],
    learningObjectives: [""],
    syllabus: "",
    fee: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Map local state to original course structure
    const submitData = {
      id: courses.length + 1, // auto increment
      code: courseData.courseCode,
      name: courseData.courseName,
      description: courseData.description,
      credits: courseData.credits,
      instructor: courseData.instructor,
      programId:
        programs.find((p) => p.name === courseData.department)?.id || 0,
      term: courseData.level, // or another field if needed
      enrolledStudents: 0,
      maxStudents: courseData.maxStudents,
      status: courseData.status,
      startDate: courseData.startDate,
      endDate: courseData.endDate,
      schedule: "", // optional
      prerequisites: courseData.prerequisites || [],
    };

    try {
      console.log("Submitting course data:", submitData);
      courses.push(submitData); // push mapped object
      alert("Course created successfully!");
      handleReset(); // reset form
    } catch (error) {
      alert("Error creating course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCourseData({
      courseName: "",
      courseCode: "",
      description: "",
      instructor: "",
      startDate: "",
      endDate: "",
      credits: 3,
      maxStudents: 30,
      department: "",
      level: "Diploma",
      status: "active",
      prerequisites: [],
      learningObjectives: [""],
      syllabus: "",
      fee: 0,
    });
  };

  return (
    <div className="create-course">
      <div className="course-header">
        <h1>Create New Course</h1>
        <p>Fill in the course details to create a new course offering</p>
      </div>

      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-sections">
          {/* Basic Information Section */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="courseName">Course Name *</label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  value={courseData.courseName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., Introduction to Computer Science"
                />
              </div>

              <div className="form-group">
                <label htmlFor="courseCode">Course Code *</label>
                <input
                  type="text"
                  id="courseCode"
                  name="courseCode"
                  value={courseData.courseCode}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="e.g., CS101"
                />
              </div>

              <div className="form-group">
                <label htmlFor="instructor">Instructor *</label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  value={courseData.instructor}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Instructor name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={courseData.department}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Department</option>
                  <option value="Software Development">
                    Software Development
                  </option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="business">Business</option>
                  <option value="arts">Arts</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="credits">Credits</label>
                <select
                  id="credits"
                  name="credits"
                  value={courseData.credits}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value={1}>1 Credit</option>
                  <option value={2}>2 Credits</option>
                  <option value={3}>3 Credits</option>
                  <option value={4}>4 Credits</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="level">Course Level</label>
                <select
                  id="level"
                  name="level"
                  value={courseData.level}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  {programs.map((program, index) => (
                    <option key={index} value={program.name}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dates Section */}
          <div className="form-section">
            <h3>Course Schedule</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="startDate">Start Date *</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={courseData.startDate}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date *</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={courseData.endDate}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="maxStudents">Maximum Students</label>
                <input
                  type="number"
                  id="maxStudents"
                  name="maxStudents"
                  value={courseData.maxStudents}
                  onChange={handleInputChange}
                  min="1"
                  max="500"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="fee">Course Fee ($)</label>
                <input
                  type="number"
                  id="fee"
                  name="fee"
                  value={courseData.fee}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="form-section">
            <h3>Course Description</h3>
            <div className="form-group">
              <label htmlFor="description">Course Description *</label>
              <textarea
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="form-textarea"
                placeholder="Provide a detailed description of the course..."
              />
            </div>
          </div>

          <button className="btn-add" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
