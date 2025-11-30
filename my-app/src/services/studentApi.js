import api from "./api";

// Fetch programs
export const getPrograms = () => api.get("/programs");

// Fetch all courses
export const getCourses = () => api.get("/courses");

// Fetch courses by program
export const getCoursesByProgram = (programName) =>
  api.get(`/courses/program/${programName}`);

// Fetch student info
export const getStudentInfo = (studentId) =>
  api.get(`/students/${studentId}`);
