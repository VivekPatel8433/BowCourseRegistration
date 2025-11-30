import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";
import { getPrograms } from "../services/studentApi";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [selectedTerm, setSelectedTerm] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);

  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // ---------------------------------------------------------
  // REUSABLE FUNCTION — Load current enrollments
  // ---------------------------------------------------------
  const loadEnrollments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/student/enrollments",
        { withCredentials: true }
      );
      setEnrolledCourses(res.data || []);
    } catch (err) {
      console.error("Failed to load enrollments:", err);
    }
  };

  // ---------------------------------------------------------
  // Initial Data Fetch: programs, courses, enrollments
  // ---------------------------------------------------------
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/courses");
        setCourses(res.data || []);
      } catch (err) {
        console.error("Error loading courses:", err);
      }
    };

    const loadProgramsData = async () => {
      try {
        const programRes = await getPrograms();
        setPrograms(programRes.data || []);
      } catch (err) {
        console.error("Error loading programs:", err);
      }
    };

    fetchCourses();
    loadProgramsData();
    loadEnrollments();
  }, []);

  // ---------------------------------------------------------
  // Enroll in a course
  // ---------------------------------------------------------
  const enroll = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:3001/api/student/enroll/${courseId}`,
        {},
        { withCredentials: true }
      );

      await loadEnrollments(); // Auto-refresh
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  // ---------------------------------------------------------
  // Unenroll from a course
  // ---------------------------------------------------------
  const unenroll = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/student/enroll/${courseId}`,
        { withCredentials: true }
      );

      await loadEnrollments(); // Auto-refresh
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

        programs,
        courses,
        enrolledCourses,

        enroll,
        unenroll,
        loadEnrollments,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
