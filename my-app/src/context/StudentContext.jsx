import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [selectedTerm, setSelectedTerm] = useState(""); 
  const [studentInfo, setStudentInfo] = useState(null);
  const [courses,setCourses] =useState(null)
  // Fetch courses on mount
  useEffect(() => {
    const init = async () => {
      await fetchCourses();
    };

    init();
  }, []);

  

  // Fetch courses (you can extend this to store courses in context)
  const fetchCourses = async () => {
    try {
     /* const res = await api.get("/courses/all");
      // do something with res.data if needed
      console.log("Courses:", res.data.data);
      setCourses(res.data.data)*/ // replace it with your api
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        selectedTerm,
        setSelectedTerm,
        studentInfo,
        setStudentInfo,
        courses
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
