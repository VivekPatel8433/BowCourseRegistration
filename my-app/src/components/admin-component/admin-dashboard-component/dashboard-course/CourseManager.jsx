import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import "./CourseManager.css";
import { courses as initialCourses, programs } from "../../../../data/Admin-mock-data";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../../context/AdminContext";

export default function CourseManager() {
  const [search, setSearch] = useState("");
  const [courseList, setCourseList] = useState(initialCourses);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const { setRemovedCourseId } = useAdmin();

  const filteredCourses = courseList.filter(
    (course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase())
  );

  // Edit
  const handleEdit = (course) => {
    setEditingCourse({ ...course });
  };

  const handleSaveEdit = () => {
    if (editingCourse) {
      const updatedCourses = courseList.map((course) =>
        course.id === editingCourse.id ? editingCourse : course
      );
      setCourseList(updatedCourses);
      setEditingCourse(null);
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

  const confirmDelete = () => {
    const updatedCourses = courseList.filter((course) => course.id !== courseToDelete.id);
    setCourseList(updatedCourses);
    setRemovedCourseId(courseToDelete.id);
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  

  return (
    <div className="courseManager">
      <h2>Search & Manage Courses</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by course name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          <FaSearch />
        </button>
      </div>

      <div className="course-list">
        {filteredCourses.slice(0, 4).map((course) => (
          <div className="course-card" key={course.id}>
            <div className="course-info">
              <strong>
                {course.code} - {course.name}
              </strong>
              <p>{course.description}</p>
              <div className="course-meta">
                <span className="term">📅 {course.term}</span>
                <span className="enrolled">👥 {course.enrolledStudents} enrolled</span>
              </div>
            </div>
            <div className="course-actions">
              <button className="edit" onClick={() => handleEdit(course)}>
                <FaEdit />
              </button>
              <button className="delete" onClick={() => handleDeleteClick (course)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        {filteredCourses.length === 0 && <p className="no-results">No courses found.</p>}
      </div>

      {/* Edit Modal */}
      {editingCourse && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Course</h2>
              <button onClick={handleCancelEdit} className="close-btn">
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="edit-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Course Code *</label>
                    <input
                      type="text"
                      name="code"
                      value={editingCourse.code}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Course Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={editingCourse.name}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Instructor *</label>
                    <input
                      type="text"
                      name="instructor"
                      value={editingCourse.instructor}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Program *</label>
                    <select
                      name="programId"
                      value={editingCourse.programId}
                      onChange={handleEditChange}
                      className="form-input"
                    >
                      {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                          {program.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Credits</label>
                    <select
                      name="credits"
                      value={editingCourse.credits}
                      onChange={handleEditChange}
                      className="form-input"
                    >
                      <option value={1}>1 Credit</option>
                      <option value={2}>2 Credits</option>
                      <option value={3}>3 Credits</option>
                      <option value={4}>4 Credits</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Max Students</label>
                    <input
                      type="number"
                      name="maxStudents"
                      value={editingCourse.maxStudents}
                      onChange={handleEditChange}
                      className="form-input"
                      min="1"
                      max="500"
                    />
                  </div>
                  <div className="form-group">
                    <label>Term</label>
                    <input
                      type="text"
                      name="term"
                      value={editingCourse.term}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={editingCourse.status}
                      onChange={handleEditChange}
                      className="form-input"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={handleCancelEdit} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && courseToDelete && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button onClick={cancelDelete} className="close-btn">
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete the course{" "}
                <strong>
                  "{courseToDelete.code} - {courseToDelete.name}"
                </strong>
                ?
              </p>
              <p className="warning-text">
                This action cannot be undone. All course data, including student
                enrollments, will be permanently deleted.
              </p>
            </div>
            <div className="modal-actions">
              <button onClick={cancelDelete} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn btn-danger">
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
