import React from "react";
import DashboardCards from "../components/students-component/studentdashboard/dashboard-card";
import TermSelection from "../components/students-component/studentTermSelection/TermSelection";
import RegisteredCourses from "../components/students-component/student-course/RegisterCourse/RegisteredCourses";
import SearchCourses from "../components/students-component/student-course/SearchCourses/SearchCourses";
import QuickActions from "../components/students-component/QuickActions/QuickActions";
import { useStudent } from "../context/StudentContext";
import StudentNavbar from "../Navigation/StudentNavigation/TopNav.jsx";
import SideNav from "../Navigation/StudentNavigation/SideNav.jsx";




export default function StudentPage() {
  const { enroll, unenroll, enrolledCourses } = useStudent();

  // ------------------------------
  // Real Data
  // ------------------------------
  const handleRegister = async (id) => {
    await enroll(id);
  };

  const handleRemoveCourse = async (id) => {
    await unenroll(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Student Navigation Header */}
      <StudentNavbar />

      {/* Main Dashboard Content */}
      <div className="py-10 px-6 max-w-7xl mx-auto space-y-10">

        {/* DASHBOARD SUMMARY CARDS */}
        <section>
          <DashboardCards />
        </section>

        {/* TERM + REGISTERED COURSES */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TermSelection />

          <RegisteredCourses
            registeredCourses={enrolledCourses}
            onRemoveCourse={handleRemoveCourse}
          />
        </section>

        {/* SEARCH + QUICK ACTIONS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SearchCourses onRegister={handleRegister} />
          <QuickActions progressBar={enrolledCourses} />
        </section>

      </div>
    </div>
  );
}
