import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useAdmin } from "../../../../context/AdminContext";
import api from "../../../../services/api";

export default function CourseManager() {
  const [search, setSearch] = useState("");
  const [courseList, setCourseList] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const { programs, courses, updateCourse } = useAdmin();
  
  useEffect(() => {
    setCourseList(courses);
  }, [courses]);

  const filteredCourses = courseList?.filter((course) => {
  const searchLower = search.toLowerCase();

  // Check name, code, term
  const matchesText =
    course.name?.toLowerCase().includes(searchLower) ||
    course.code?.toLowerCase().includes(searchLower) ||
    course.term?.toLowerCase().includes(searchLower);

  // Check numeric credit
  const matchesCredit = !isNaN(Number(search)) && Number(course.credit) === Number(search);

  return matchesText || matchesCredit;
});


  // Edit
  const handleEdit = (course) => {
    setEditingCourse({ ...course });
  };

  const handleSaveEdit = async () => {
    if (!editingCourse) return;

    try {
      await api.patch(`/courses/${editingCourse._id}`, editingCourse);
      updateCourse();
      setEditingCourse(null);
    } catch (err) {
      console.error("Failed to update course", err);
    }
  };

  const handleCancelEdit = () => setEditingCourse(null);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Delete
  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/courses/${courseToDelete._id}`);
      updateCourse();
      setEditingCourse(null);
      setShowDeleteModal(false);
      setCourseToDelete(null);
    } catch (error) {
      console.error("Failed to delete course", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  return (
   <div className="relative top-2 ml-8 w-[80%] max-w-4xl font-['Arial',sans-serif] border-2 border-solid border-gray-100 rounded-xl p-5 min-h-[53vw]">
      <h2 className="mb-5 ml-[20%] text-2xl text-gray-900 font-semibold">
        Search & Manage Courses
      </h2>

      {/* Search Bar */}
      <div className="flex gap-2.5 mb-5">
        <input
          type="text"
          placeholder="Search by course name, code, credit, term..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* <button className="px-3.5 py-2.5 rounded-lg bg-blue-600 text-white cursor-pointer flex items-center justify-center hover:bg-blue-700 transition-colors">
          <FaSearch />
        </button> */}
      </div>

      {/* Course List */}
      <div className="flex flex-col gap-5">
        {filteredCourses?.slice(0, 4).map((course) => (
          <div key={course.id} className="flex justify-between items-start p-4 border border-gray-200 rounded-xl bg-gray-100 shadow-sm">
            {/* Course Info */}
            <div className="flex-1">
              <strong className="text-base block mb-1">
                {course.code} - {course.name}
              </strong>
              <p className="text-sm text-gray-600 mb-2">{course.description}</p>
              <div className="text-sm text-gray-500 flex gap-4">
                <span>📅 {course.terms.join(',')}</span>
                <span>👥 {course.totalEnrollment} enrolled</span>
                <span>Credit {course.credit}</span>
                <span>Start {new Date(course?.startDate).toLocaleDateString()}</span>
                <span>End {new Date(course?.endDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() => handleEdit(course)}
                className="p-2 border-none rounded bg-blue-600 text-white cursor-pointer text-sm flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteClick(course)}
                className="mt-6 p-2 border-none rounded bg-red-600 text-white cursor-pointer text-sm flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        
        {filteredCourses?.length === 0 && (
          <p className="text-center text-gray-500 py-5">No courses found.</p>
        )}
      </div>

      {/* Edit Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-7 py-6 border-b border-gray-200">
              <h2 className="text-xl text-gray-800 font-semibold m-0">Edit Course</h2>
              <button
                onClick={handleCancelEdit}
                className="bg-transparent border-none text-xl text-gray-500 cursor-pointer p-0 w-7 h-7 flex items-center justify-center hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-7">
              <div className="grid grid-cols-2 gap-5">
                <div className="mb-0">
                  <label className="block mb-2 font-semibold text-gray-800 text-sm">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={editingCourse.code}
                    onChange={handleEditChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-200 box-border"
                  />
                </div>

                <div className="mb-0">
                  <label className="block mb-2 font-semibold text-gray-800 text-sm">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editingCourse.name}
                    onChange={handleEditChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-200 box-border"
                  />
                </div>

                <div className="mb-0">
                  <label className="block mb-2 font-semibold text-gray-800 text-sm">
                    Instructor *
                  </label>
                  <input
                    type="text"
                    name="instructor"
                    value={editingCourse.instructor}
                    onChange={handleEditChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-200 box-border"
                  />
                </div>

                <div className="mb-0">
                  <label className="block mb-2 font-semibold text-gray-800 text-sm">
                    Program *
                  </label>
                  <select
                    name="programId"
                    value={editingCourse.programId}
                    onChange={handleEditChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-200 box-border"
                  >
                    {programs?.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-0">
                  <label className="block mb-2 font-semibold text-gray-800 text-sm">
                    Credits
                  </label>
                  <select
                    name="credit"
                    value={editingCourse.credit}
                    onChange={handleEditChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-200 box-border"
                  >
                    <option value={1}>1 Credit</option>
                    <option value={2}>2 Credits</option>
                    <option value={3}>3 Credits</option>
                    <option value={4}>4 Credits</option>
                  </select>
                </div>

                <div className="mb-0">
                  <label className="block mb-2 font-semibold text-gray-800 text-sm">
                    Max Students
                  </label>
                  <input
                    type="number"
                    name="maxStudents"
                    value={editingCourse.maxStudents}
                    onChange={handleEditChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-200 box-border"
                    min="1"
                    max="500"
                  />
                </div>

                <div className="mb-0">
                  <label className="block mb-2 font-semibold text-gray-800 text-sm">
                    Term
                  </label>
                  <select
                    name="term"
                    value={editingCourse.term}
                    onChange={handleEditChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-200 box-border"
                  >
                    <option value="">Select Term</option>
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                  </select>
                </div>

                <div className="mb-0">
                  <label className="block mb-2 font-semibold text-gray-800 text-sm">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editingCourse.status}
                    onChange={handleEditChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-200 box-border"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-4 justify-end px-7 py-5 border-t border-gray-200">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && courseToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-7 py-6 border-b border-gray-200">
              <h2 className="text-xl text-gray-800 font-semibold m-0">Confirm Delete</h2>
              <button
                onClick={cancelDelete}
                className="bg-transparent border-none text-xl text-gray-500 cursor-pointer p-0 w-7 h-7 flex items-center justify-center hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-7">
              <p className="text-gray-700">
                Are you sure you want to delete the course{" "}
                <strong>
                  "{courseToDelete.code} - {courseToDelete.name}"
                </strong>
                ?
              </p>
              <p className="text-red-600 font-medium mt-4 p-2.5 bg-red-50 rounded border-l-4 border-red-600">
                This action cannot be undone. All course data, including student
                enrollments, will be permanently deleted.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-4 justify-end px-7 py-5 border-t border-gray-200">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}