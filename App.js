// Test commit for Student Dashboard

import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";

function App() {
  // keep track of which page the user is on
  const [page, setPage] = useState("home");

  // list of students (signup will add new ones here)
  const [students, setStudents] = useState([]);

  // current logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // some example courses
  const [courses] = useState([
    {
      code: "SODV2201",
      name: "Web Programming",
      term: "Winter",
      description: "Learn React, Node, and how websites work."
    },
    {
      code: "DB2202",
      name: "Database Systems",
      term: "Fall",
      description: "Introduction to SQL and database design."
    },
    {
      code: "OOB2203",
      name: "Object-Oriented Basics",
      term: "Summer",
      description: "Learn the basics of object-oriented programming."
    },
  ]);

  // handle signup (adds a new student to array)
  const handleSignup = (student) => {
    setStudents([...students, student]);
    alert("Signup successful! Please login now.");
    setPage("login");
  };

  // handle login (find student in array)
  const handleLogin = (username, password) => {
    const user = students.find(
      (s) => s.username === username && s.password === password
    );
    if (user) {
      setCurrentUser(user);
      setPage("dashboard");
    } else {
      alert("Invalid login! Try again.");
    }
  };

  return (
    <div>
      {/* Header navigation */}
      <Header setPage={setPage} currentUser={currentUser} />

      {/* Page rendering */}
      {page === "home" && <Home />}
      {page === "signup" && <Signup onSignup={handleSignup} />}
      {page === "login" && <Login onLogin={handleLogin} />}
      {page === "dashboard" && currentUser && (
        <Dashboard currentUser={currentUser} />
      )}
      {page === "courses" && <Courses courses={courses} />}

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}

export default App;
