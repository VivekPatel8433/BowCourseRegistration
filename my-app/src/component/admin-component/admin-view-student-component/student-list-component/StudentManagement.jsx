import React, { useState, useEffect } from 'react';
import './student-management.css';
import { students as studentInfo } from '../../../../data/students';
import { programs as programInfo } from '../../../../data/Admin-mock-data';

const StudentManagement = () => {
  const [students, setStudents] = useState(studentInfo);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState(students);

  // Get programs for filter and display
  const programs = ['all', ...programInfo];

  // Enhanced student data with program names
  const studentsWithProgramNames = students.map(student => {
    const program = programInfo.find(p => p.id === student.programId);
    return {
      ...student,
      programName: program ? program.name : 'Unknown Program',
      programCode: program ? program.code : 'N/A'
    };
  });

  // Filter students based on search and filters
  useEffect(() => {
    let filtered = studentsWithProgramNames;
    
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.programId.toString().includes(searchTerm.toString())
      );
    }

    if (selectedProgram !== 'all') {
      filtered = filtered.filter(student => Number(student.programId )=== Number(selectedProgram));
    
      
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(student => student.status === selectedStatus);
    }

    setFilteredStudents(filtered);
  }, [searchTerm, selectedProgram, selectedStatus, students]);

  // Toggle student details expansion
  const toggleStudentDetails = (studentId) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  // Calculate program statistics - FIXED
  const programStats = studentsWithProgramNames.reduce((acc, student) => {
    const programName = student.programName;
    
    if (!acc[programName]) {
      acc[programName] = { total: 0, active: 0, inactive: 0 };
    }
    
    acc[programName].total++;
    if (student.status === 'active') {
      acc[programName].active++;
    } else {
      acc[programName].inactive++;
    }
    
    return acc;
  }, {});

  // Handle status change
  const handleStatusChange = (studentId, newStatus) => {
    setStudents(prev => prev.map(student =>
      student.id === studentId ? { ...student, status: newStatus } : student
    ));
  };

  // Export student data - FIXED
  const exportStudentData = () => {
    const csvData = studentsWithProgramNames.map(student => ({
      'Student ID': student.studentId,
      'Name': student.name,
      'Email': student.email,
      'Program': student.programName,
      'Program Code': student.programCode,
      'Semester': student.semester,
      'Enrollment Date': student.enrollmentDate,
      'Status': student.status,
      'GPA': student.gpa,
      'Contact': student.contact
    }));

    // Check if there's data to export
    if (csvData.length === 0) {
      alert('No data to export');
      return;
    }

    const csvHeaders = Object.keys(csvData[0]).join(',');
    const csvRows = csvData.map(row => Object.values(row).join(','));
    const csvContent = [csvHeaders, ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="student-management">
      <div className="student-management-header">
        <h1>Student Management</h1>
        <p>View and manage registered students across all programs</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{students.filter(s => s.status === 'active').length}</h3>
            <p>Active Students</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{programInfo.length}</h3>
            <p>Programs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>{students.reduce((acc, student) => acc + (student.courses?.length || 0), 0)}</h3>
            <p>Total Enrollments</p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="search-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search students by name, ID, email, or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-group">
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Programs</option>
              {programs.filter(p => p !== 'all').map(program => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <button onClick={exportStudentData} className="btn btn-export">
          📥 Export Data
        </button>
      </div>

      {/* Students Table */}
      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Program</th>
              <th>Semester</th>
              <th>Enrollment Date</th>
              <th>GPA</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <React.Fragment key={student.id}>
                  <tr className={`student-row ${student.status === 'inactive' ? 'inactive' : ''}`}>
                    <td className="student-id">{student.studentId}</td>
                    <td className="student-name">
                      <div className="name-email">
                        <strong>{student.name}</strong>
                        <span className="email">{student.email}</span>
                      </div>
                    </td>
                    <td className="program">
                      <div>
                        <strong>{student.programName}</strong>
                        <div className="program-code">{student.programCode}</div>
                      </div>
                    </td>
                    <td className="semester">Semester {student.semester}</td>
                    <td className="enrollment-date">
                      {new Date(student.enrollmentDate).toLocaleDateString()}
                    </td>
                    <td className="gpa">
                      <span className={`gpa-badge ${student.gpa >= 3.5 ? 'high' : student.gpa >= 3.0 ? 'medium' : 'low'}`}>
                        {student.gpa}
                      </span>
                    </td>
                    <td className="status">
                      <select
                        value={student.status}
                        onChange={(e) => handleStatusChange(student.id, e.target.value)}
                        className={`status-select ${student.status}`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="actions">
                      <button
                        onClick={() => toggleStudentDetails(student.id)}
                        className="btn btn-details"
                        title="View Details"
                      >
                        {expandedStudent === student.id ? '▲' : '▼'} Details
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Details Row */}
                  {expandedStudent === student.id && (
                    <tr className="details-row">
                      <td colSpan="8">
                        <div className="student-details">
                          <div className="details-section">
                            <h4>Contact Information</h4>
                            <div className="contact-info">
                              <div><strong>Email:</strong> {student.email}</div>
                              <div><strong>Phone:</strong> {student.contact}</div>
                              <div><strong>Enrolled Since:</strong> {new Date(student.enrollmentDate).toLocaleDateString()}</div>
                            </div>
                          </div>
                          
                          <div className="details-section">
                            <h4>Current Courses ({student.courses?.length || 0})</h4>
                            <div className="courses-list">
                              {student.courses && student.courses.length > 0 ? (
                                student.courses.map((course, index) => (
                                  <div key={index} className="course-item">
                                    <div className="course-code">{course.code}</div>
                                    <div className="course-name">{course.name}</div>
                                    <div className="course-credits">{course.credits} Credits</div>
                                    <div className={`course-grade ${course.grade?.replace('+', 'plus').replace('-', 'minus') || 'no-grade'}`}>
                                      {course.grade || 'N/A'}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div>No courses enrolled</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="details-section">
                            <h4>Academic Summary</h4>
                            <div className="academic-summary">
                              <div className="summary-item">
                                <span>Total Credits:</span>
                                <strong>{student.courses?.reduce((sum, course) => sum + (course.credits || 0), 0) || 0}</strong>
                              </div>
                              <div className="summary-item">
                                <span>Current GPA:</span>
                                <strong className={`gpa-${student.gpa >= 3.5 ? 'high' : student.gpa >= 3.0 ? 'medium' : 'low'}`}>
                                  {student.gpa}
                                </strong>
                              </div>
                              <div className="summary-item">
                                <span>Status:</span>
                                <span className={`status-badge ${student.status}`}>
                                  {student.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-students">
                  No students found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;