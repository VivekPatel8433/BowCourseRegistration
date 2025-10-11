import React, { useEffect, useState } from "react";
import { FaBook, FaUsers, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./dashboard-cards.css";
import { courses,programs } from "../../../../data/Admin-mock-data";
import { useNavigate } from "react-router-dom";

const DashboardCards = () => {
  const [courseList,setCourseList]=useState(courses)
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
        setCourseList(prev=>prev.filter(course=>course.id !== courseId))
    }
  };

   const viewAllCourses = () => {
    navigate("/admin/manage-courses");
  };

  const viewAllStudents = () => {
    navigate("/admin/view-students");
  };

   const createNewCourse = () => {
    navigate("/admin/create-course"); 
      
  };

  
  const colors=[
    {
    color: "#e8f1ff",
     textColor: "#2563eb"
  },
  {
  color: "#ecfdf5",
  textColor: "#059669" 
  },
  {
    color: "#f5f3ff",
   textColor: "#7c3aed" 
  }
]
  return (
    <div className="dashboard-grid">
      {/* Course Management */}
      <div className="Card">
        <div className="card-header">
          <h3><FaBook className="faceBook"/> Course Management</h3>
          <button className="create-btn" onClick={createNewCourse}>
            <FaPlus /> Create Course
          </button>
        </div>
        <div className="card-body">
          {courseList.slice(0,3).map((courseItem) => (
            <div className="course-item" key={courseItem.id}>
              <div>
                <strong >{courseItem.code} - {courseItem.name}</strong>
                <p >{courseItem.term} • {courseItem.enrolledStudents} students enrolled</p>
              </div>
              <div className="actions">
                <FaEdit className="edit"  title="Edit Course" onClick={()=>editCourse(courseItem.id??null)} />
                <FaTrash className="delete" title="Delete course" onClick={()=>deleteCourse(courseItem.id??null)} />
              </div>
            </div>
          ))}
        </div>
        <button className="view-all" onClick={viewAllCourses}>View All Courses</button>
      </div>

      {/* Student Overview */}
      <div className="Card">
        <div className="card-header">
          <h3><FaUsers  className="faUsers"/> Student Overview</h3>
        </div>
        <div className="card-body">
          {programs.slice(0,3).map((prog, idx) => (
            <div
              key={idx}
              className="program-item"
              style={{ backgroundColor: colors[idx].color}}
            >
              <div>
                <strong>{prog.name}</strong>
                <p>{prog.duration}</p>
              </div>
              <span style={{ color: colors[idx].textColor }}>
                {prog.totalStudents} students
              </span>
            </div>
          ))}
        </div>
        <button className="view-all" style={{marginTop:120}} onClick={viewAllStudents}>View All Students</button>
      </div>
    </div>
  );
};

export default DashboardCards;
