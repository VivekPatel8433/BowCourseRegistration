import React, { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [selectedTerm, setSelectedTerm] = useState("Spring 2025");
  const [studentInfo, setStudentInfo] = useState(null);

  return (
    <StudentContext.Provider value={{ selectedTerm, setSelectedTerm, studentInfo, setStudentInfo }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
