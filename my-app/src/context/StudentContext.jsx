import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [selectedTerm, setSelectedTerm] = useState(""); 
  const [studentInfo, setStudentInfo] = useState(null);
  const [courses, setCourses] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  // Fetch courses on mount
  useEffect(() => {
    (async () => {
      await fetchCourses();
      await fetchEnrolledCourses();
    })();
  }, []);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses/all");
      setCourses(res.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

 const fetchEnrolledCourses = async () => {
  try {
    const res = await api.get("/students/courses");

    // res.data is an array of enrollments
    const coursesOnly = res.data.map(e => e.courseId);

    setEnrolledCourses(coursesOnly);
    console.log("Enrolled courses:", coursesOnly);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
  }
};


  // Enroll in a course
  const enroll = async (id) => {
    try {
      await api.post(`/students/enroll/${id}`);
      await fetchEnrolledCourses(); // refresh list
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  // Unenroll from a course
  const unenroll = async (id) => {
    try {
      console.log("dropping",id)
      await api.delete(`students/drop/${id}`);
      await fetchEnrolledCourses(); // refresh list
    } catch (error) {
      console.error("Error unenrolling:", error);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        selectedTerm,
        setSelectedTerm,
        studentInfo,
        setStudentInfo,
        courses,
        enrolledCourses,
        enroll,
        unenroll,
       
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
