import React from "react";

function Header({ setPage, currentUser }) {
  return (
    <header style={{ background: "green", color: "white", padding: "15px" }}>
      <h2>🎓 Bow Course Registration</h2>
      <nav>
        <button onClick={() => setPage("home")}>Home</button>
        {!currentUser && (
          <>
            <button onClick={() => setPage("signup")}>Signup</button>
            <button onClick={() => setPage("login")}>Login</button>
          </>
        )}
        {currentUser && (
          <>
            <button onClick={() => setPage("dashboard")}>Dashboard</button>
            <button onClick={() => setPage("courses")}>Courses</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
