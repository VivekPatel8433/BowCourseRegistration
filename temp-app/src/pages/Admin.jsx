import React, { useState } from "react";

function Admin({ students, courses, onDeleteStudent, onResetCourses, onAddCourse }) {
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    term: "",
    description: "",
  });

  return (
    <div style={{ textAlign: "center", margin: "40px" }}>
      <h2>👩‍💼 Admin Panel</h2>
      <p>Manage students and courses here.</p>

      {/* ----------------- Add New Course Section ----------------- */}
      <div
        style={{
          margin: "40px auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "80%",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h3 style={{ color: "#1a237e" }}>➕ Add New Course</h3>

        <input
          type="text"
          placeholder="Course Code"
          value={newCourse.code}
          onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Term (e.g., Winter)"
          value={newCourse.term}
          onChange={(e) => setNewCourse({ ...newCourse, term: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
          style={inputStyle}
        />
        <br />
        <button style={addBtn} onClick={() => onAddCourse(newCourse)}>
          Add Course
        </button>
      </div>

      {/* ----------------- Student Management Section ----------------- */}
      <h3>👩‍🎓 Manage Students</h3>
      {students.length === 0 ? (
        <p>No students registered yet.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Courses Registered</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.username}>
                <td style={tdStyle}>{s.username}</td>
                <td style={tdStyle}>
                  {s.registeredCourses?.length > 0
                    ? s.registeredCourses.join(", ")
                    : "None"}
                </td>
                <td style={tdStyle}>
                  <button style={deleteBtn} onClick={() => onDeleteStudent(s.username)}>
                    Delete
                  </button>
                  <button style={resetBtn} onClick={() => onResetCourses(s.username)}>
                    Reset Courses
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Styling
const tableStyle = {
  margin: "20px auto",
  borderCollapse: "collapse",
  width: "90%",
  border: "1px solid #ccc",
};

const thStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  backgroundColor: "#3949ab",
  color: "white",
  textAlign: "center",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "center",
};

const inputStyle = {
  margin: "8px",
  padding: "10px",
  width: "200px",
  borderRadius: "5px",
  border: "1px solid #999",
};

const addBtn = {
  backgroundColor: "#43a047",
  color: "white",
  border: "none",
  padding: "10px 20px",
  marginTop: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  backgroundColor: "#e53935",
  color: "white",
  border: "none",
  padding: "6px 12px",
  marginRight: "8px",
  borderRadius: "5px",
  cursor: "pointer",
};

const resetBtn = {
  backgroundColor: "#1e88e5",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Admin;
