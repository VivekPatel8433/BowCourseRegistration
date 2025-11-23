import React, { useState } from "react";
import DashboardCards from '../components/students-component/studentdashboard/dashboard-card';
import TermSelection from '../components/students-component/studentTermSelection/TermSelection';
import RegisteredCourses from '../components/students-component/student-course/RegisterCourse/RegisteredCourses';
import SearchCourses from '../components/students-component/student-course/SearchCourses/SearchCourses';
import QuickActions from '../components/students-component/QuickActions/QuickActions';

export default function StudentPage(){
  const [registeredCourses, setRegisteredCourses] = useState([]);

  const handleRegister = (code) => {
    setRegisteredCourses((prev) => {
      if (prev.includes(code)) return prev;
      return [...prev, code];
    });
  };
  
  const handleRemoveCourse = (courseCode) => {
    setRegisteredCourses(prev => prev.filter(code => code !== courseCode));
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
    <QuickActions progressBar={registeredCourses}/>
  </div>
</div>
  );
}