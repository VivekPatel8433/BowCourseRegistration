import React from "react";
import { useStudent } from "../../../../context/StudentContext";
export default function RegisteredCourses({ registeredCourses, onRemoveCourse }) {
  const { courses } = useStudent();

  // Filter courses that are registered and remove duplicates
  const filteredCourses = courses
    ?.filter((c) => registeredCourses.includes(c.code))
    ?.filter((value, index, self) =>
      index === self.findIndex((t) => t.code === value.code)
    );
  return (
   <div className="font-['Inter',Arial,sans-serif] p-5 relative -top-1 left-5 w-96">
      <div className="w-[520px] bg-indigo-100 rounded-xl shadow-sm border border-gray-100 border-opacity-10 p-5 min-h-96">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-b from-blue-50 to-indigo-100 rounded grid place-items-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 4h10v14H6z"
                  fill="#0ea5e9"
                  opacity="0.15"
                />
                <path
                  d="M7 5h9v12H7z"
                  stroke="#0284c7"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8h6"
                  stroke="#0284c7"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 m-0">Registered Courses</h3>
          </div>
          <span className="text-sm bg-indigo-100 text-gray-700 px-3 py-1.5 rounded-full">
            {filteredCourses?.length}/5 courses
          </span>
        </div>

        {/* Course List */}
        <div className="flex flex-col gap-3.5">
          {filteredCourses?.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.code} className="bg-indigo-300 rounded-lg p-4 flex justify-between items-center shadow-sm border border-gray-900 border-opacity-5">
                <div className="flex flex-col gap-1.5">
                  <span className="font-bold text-gray-900 text-base">{course.code}</span>
                  <span className="text-gray-700 text-sm">{course.name}</span>
                </div>
                <button 
                  className="bg-transparent border-none cursor-pointer rounded p-1 hover:bg-red-500 hover:bg-opacity-20 transition-colors"
                  aria-label="Remove course" 
                  onClick={() => onRemoveCourse(course.code)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No registered courses yet</p>
          )}

          {/* Add Course Button */}
           {filteredCourses?.length < 5 && (
          <button className="mt-1.5 rounded-lg p-4 border-2 border-dashed border-gray-300 border-opacity-30 flex items-center gap-3 text-gray-700 text-sm bg-transparent cursor-pointer transition-all hover:bg-gray-50 hover:border-gray-400 hover:border-opacity-40">
            <span className="w-8 h-8 rounded grid place-items-center bg-gray-900 bg-opacity-10 font-bold text-lg">
              +
            </span>
            <span>
              Add Course <small className="text-gray-500 font-normal">(2 more available)</small>
            </span>
          </button>
           )}
        </div>
      </div>
    </div>
  );
}