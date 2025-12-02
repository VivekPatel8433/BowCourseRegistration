import React from "react";
import { FaBook, FaUsers, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../../context/AdminContext";

const DashboardCards = () => {
  const { programs, courses } = useAdmin();
  console.log({ programs, courses });
  const navigate = useNavigate();

  const createNewCourse = () => {
    navigate("/admin/create-course");
  };

  const colors = [
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
  ];

  return (
   <div className="relative top-2 mr-8 grid grid-cols-[2fr_1fr] gap-6 m-5 w-[95%] h-auto border border-gray-200 rounded-xl">

      {/* Course Management */}
      <div className="bg-gray-200 border border-gray-200 rounded-xl p-4 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FaBook className="text-blue-600 bg-white" />
            Course Management
          </h3>
          <button
            className="bg-purple-400 text-white border-none px-3.5 py-2 rounded-lg flex items-center gap-1.5 text-sm cursor-pointer hover:bg-blue-700 transition-colors"
            onClick={createNewCourse}
          >
            <FaPlus />
            Create Course
          </button>
        </div>
        <div className="flex flex-col space-y-2">
          {courses?.slice(0, 4).map((courseItem) => (
            <div
              key={courseItem.id}
              className="flex justify-between items-center bg-blue-100 rounded-lg p-3"
            >
              <div>
                <strong className="text-sm block w-[20vw]">
                  {courseItem.code} - {courseItem.name}
                </strong>
                <p className="mt-1 text-xs text-gray-600">
                  {courseItem.terms}  {'   '+courseItem.totalEnrollment} students enrolled
                </p>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Overview */}
      <div className="bg-gray-200 border border-gray-200 rounded-xl p-4 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FaUsers className="text-blue-600 bg-white" />
            Student Overview
          </h3>
        </div>
        <div className="flex flex-col space-y-2">
          {programs?.slice(0, 3).map((prog, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center rounded-lg p-3"
              style={{ backgroundColor: colors[idx].color }}
            >
              <div>
                <strong className="text-sm">{prog.name}</strong>
                <p className="mt-1 text-xs text-gray-600">{prog.duration} year</p>
              </div>
              <span style={{ color: colors[idx].textColor }} className="text-sm">
                {prog.totalEnrolledStudents} students
              </span>
            </div>
          ))}
        </div>
        {/* <button 
          className="mt-8 bg-transparent border border-blue-600 text-blue-600 px-2 py-2 rounded-lg cursor-pointer text-sm hover:bg-blue-50 transition-colors"
          onClick={viewAllStudents}
        >
          View All Students
        </button> */}
      </div>
    </div>
  );
};

export default DashboardCards;