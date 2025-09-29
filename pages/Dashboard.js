import React from "react";

function Dashboard({ currentUser }) {
  return (
    <div style={{ padding: "20px" }}>
      <h3>Student Dashboard</h3>
      <p>👋 Welcome, <strong>{currentUser.username}</strong></p>
      <p>Program: {currentUser.program}</p>
      <p>Student ID (sample): #{Math.floor(Math.random() * 10000)}</p>
    </div>
  );
}

export default Dashboard;
