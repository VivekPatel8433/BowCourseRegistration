import React, { useState, useEffect } from 'react';
import './admin-course-management.css';
import { useLocation } from "react-router-dom";
import { programs, courses } from "../../../../data/Admin-mock-data"

const AdminCourseManagement = () => {
  const location = useLocation();
  const isEditing = location.state?.isEditing;
  const editingCourseId = location.state?.courseId;
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCourse, setEditingCourse] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [coursesByProgram, setCoursesByProgram] = useState({});

  useEffect(() => {
  if (isEditing && editingCourseId) {
    const courseToEdit = courses.find(course => course.id === editingCourseId);
    if (courseToEdit) {
      setEditingCourse(courseToEdit);
    }
  }
}, []);

  // Group courses by program
  useEffect(() => {
    const grouped = {};
    
    programs.forEach(program => {
      // Filter courses for this program
      const programCourses = courses.filter(course => 
        course.programId === program.id
      );
      
      if (programCourses.length > 0) {
        grouped[program.id] = {
          program: program,
          courses: programCourses
        };
      }
    });
    
    setCoursesByProgram(grouped);
  }, [courses]);

  // Filter courses based on search term
  useEffect(() => {
    let filtered = courses;
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) 
    
      );
      
    }

    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle edit
  const handleEdit = (course) => {
    setEditingCourse({ ...course });
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (editingCourse) {
      
      const updatedCourses = courses.map(course =>
        course.id === editingCourse.id ? editingCourse : course
      );
      setFilteredCourses(updatedCourses);
      setEditingCourse(null);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingCourse(null);
  };

  // Handle input change in edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle delete confirmation
  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    const updatedCourses = courses.filter(course => course.id !== courseToDelete.id);
    setFilteredCourses(updatedCourses);
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  // Toggle course status
  const toggleCourseStatus = (courseId) => {
    const updatedCourses = courses.map(course =>
      course.id === courseId
        ? { ...course, status: course.status === 'active' ? 'inactive' : 'active' }
        : course
    );
    setFilteredCourses(updatedCourses);
  };

  // Get courses grouped by program for display
  const getGroupedCoursesForDisplay = () => {
    if (searchTerm) {
      // If searching, show all filtered courses without grouping
      return { 
        searchResults: { 
          program: { name: "Search Results" }, 
          courses: filteredCourses 
        } 
      };
    } else {
      // If not searching, show courses grouped by program
      const grouped = {};
      
      programs.forEach(program => {
        const programCourses = filteredCourses.filter(course => 
          course.programId === program.id
        );
        
        if (programCourses.length > 0) {
          grouped[program.id] = {
            program: program,
            courses: programCourses
          };
        }
      });
      
      return grouped;
    }
  };

  const groupedCourses = getGroupedCoursesForDisplay();

  return (
    <div className="course-manager">
      <div className="course-manager-header">
        <h1>Course Management</h1>
        <p>Manage all courses in the system - organized by programs</p>
      </div>

      {/* Search and Controls Section */}
      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by course name, code, instructor, or department..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="courses-stats">
          <span className="stat-item">
            Total Courses: <strong>{courses.length}</strong>
          </span>
          <span className="stat-item">
            Programs: <strong>{programs.length}</strong>
          </span>
          <span className="stat-item">
            Active: <strong>{courses.filter(c => c.status === 'active').length}</strong>
          </span>
        </div>
      </div>

      {/* Courses grouped by Program */}
      <div className="courses-by-program">
        {Object.keys(groupedCourses).length > 0 ? (
          Object.entries(groupedCourses).map(([programId, { program, courses: programCourses }]) => (
            <div key={programId} className="program-section">
              <div className="program-header">
                <h2 className="program-title">
                  {program.name}
                  <span className="program-info">
                    {program.duration} • {programCourses.length} courses • {program.totalStudents} students
                  </span>
                </h2>
                <div className="program-description">
                  {program.description}
                </div>
              </div>

              <div className="courses-table-container">
                <table className="courses-table" >
                  <colgroup>
                    <col style={{ width: "10%" }} /> {/* Course Code */}
                    <col style={{ width: "20%" }} /> {/* Course Name */}
                    <col style={{ width: "15%" }} /> {/* Instructor */}
                    <col style={{ width: "7%" }} />  {/* Credits */}
                    <col style={{ width: "15%" }} /> {/* Term */}
                    <col style={{ width: "10%" }} /> {/* Enrollment */}
                    <col style={{ width: "10%" }} />  {/* Status */}
                    <col style={{ width: "30%" }} />  {/* Actions */}
                  </colgroup>
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Instructor</th>
                      <th>Credits</th>
                      <th>Term</th>
                      <th>Enrollment</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programCourses.map(course => (
                      <tr key={course.id} className={course.status === 'inactive' ? 'inactive' : ''}>
                        <td className="course-code">{course.code}</td>
                        <td className="course-name">
                          <div>
                            <strong>{course.name}</strong>
                            {course.description && (
                              <div className="course-description">{course.description}</div>
                            )}
                          </div>
                        </td>
                        <td className="instructor">{course.instructor}</td>
                        <td className="credits">{course.credits}</td>
                        <td className="term">{course.term}</td>
                        <td className="enrollment">
                          <div className="enrollment-bar">
                            <div 
                              className="enrollment-fill"
                              style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                            ></div>
                            <span className="enrollment-text">
                              {course.enrolledStudents}/{course.maxStudents}
                            </span>
                          </div>
                        </td>
                        <td className="status">
                          <span className={`status-badge ${course.status}`}>
                            {course.status}
                          </span>
                        </td>
                        <td className="actions" >
                          <button
                            onClick={() => handleEdit(course)}
                            className="btn btn-edit"
                            title="Edit Course"
                            style={{position:"relative",right:"12vw"}}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => toggleCourseStatus(course.id)}
                            className={`btn btn-status ${course.status === 'active' ? 'btn-inactive' : 'btn-active'}`}
                            title={course.status === 'active' ? 'Deactivate' : 'Activate'}
                            style={{ position:"relative",right:"12vw"}}
                          >
                            {course.status === 'active' ? '⏸️' : '▶️'}
                          </button>
                          <button
                            onClick={() => handleDeleteClick(course)}
                            className="btn btn-delete"
                            title="Delete Course"
                            style={{position:"relative",right:"12vw"}}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="no-courses-message">
            <p>No courses found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Course</h2>
              <button onClick={handleCancelEdit} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="edit-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Course Code *</label>
                    <input
                      type="text"
                      name="courseCode"
                      value={editingCourse.code}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Course Name *</label>
                    <input
                      type="text"
                      name="courseName"
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
                      {programs.map(program => (
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && courseToDelete && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button onClick={cancelDelete} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete the course <strong>"{courseToDelete.code} - {courseToDelete.name}"</strong>?
              </p>
              <p className="warning-text">
                This action cannot be undone. All course data, including student enrollments, will be permanently deleted.
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
};

export default AdminCourseManagement;