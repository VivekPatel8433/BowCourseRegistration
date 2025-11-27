import React, { useState } from "react";
import DashboardCards from '../components/students-component/studentdashboard/dashboard-card';
import TermSelection from '../components/students-component/studentTermSelection/TermSelection';
import RegisteredCourses from '../components/students-component/student-course/RegisterCourse/RegisteredCourses';
import SearchCourses from '../components/students-component/student-course/SearchCourses/SearchCourses';
import QuickActions from '../components/students-component/QuickActions/QuickActions';
import { useStudent } from "../context/StudentContext";
export default function StudentPage(){
   const [registeredCourses, setRegisteredCourses] = useState([]);
  const { enroll, unenroll,enrolledCourses } = useStudent();

   const handleRegister = async (id) => {
    // avoid duplicate registration
    console.log("register couours",id)
    if (registeredCourses.includes(id)) return;

    await enroll(id); // wait for API

    // update state after successful enrollment
    setRegisteredCourses((prev) => [...prev, id]);
  };

  const handleRemoveCourse = async (id) => {
    await unenroll(id);

    setRegisteredCourses((prev) => prev.filter((courseId) => courseId !== id));
  };
  return(
    <div className="min-h-screen p-6 bg-gray-50">
  {/* First Row */}
  <div className="mb-8">
    <DashboardCards/>
  </div>

  {/* Second Row */}
  <div className="grid grid-cols-2 gap-6 mb-6">
    <TermSelection/>
     <RegisteredCourses registeredCourses={registeredCourses} onRemoveCourse={handleRemoveCourse}/>
  </div>

  {/* Third Row */}
  <div className="grid grid-cols-2 gap-6">
    <SearchCourses onRegister={handleRegister} />
    <QuickActions progressBar={enrolledCourses}/>
  </div>
</div>
  );
}