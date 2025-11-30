import React from "react";
import { useStudent } from "../../../../context/StudentContext";

export default function RegisteredCourses({ onRemoveCourse }) {
  const { enrolledCourses } = useStudent();

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Registered Courses</h3>
        <span className="text-sm text-gray-600">
          {enrolledCourses.length}/5 courses
        </span>
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((c) => (
            <div
              key={c._id}
              className="p-4 bg-indigo-50 rounded-md border flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {c.courseId?.code}
                </p>
                <p className="text-gray-600 text-sm">
                  {c.courseId?.name}
                </p>
              </div>

              <button
                className="text-red-600 hover:text-red-700 text-sm font-medium"
                onClick={() => onRemoveCourse(c.courseId?._id)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">
            No registered courses yet
          </p>
        )}
      </div>
    </div>
  );
}
