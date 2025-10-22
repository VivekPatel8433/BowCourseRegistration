// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile"; // ✅ Profile import
import Contact from "./pages/Contact"; // ✅ Added Contact import

// 🔹 Sidebar-linked pages
import TermSelection from "./pages/TermSelection";
import CourseRegistration from "./pages/CourseRegistration";
import SearchCourses from "./pages/SearchCourses";
import ContactAdmin from "./pages/ContactAdmin";

function App() {
  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Persist login after refresh
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  // 🔹 Example course list
  const [courses] = useState([
    {
      code: "SODV2201",
      name: "Web Programming",
      term: "Winter",
      description: "Learn React, Node, and how websites work.",
    },
    {
      code: "DB2202",
      name: "Database Systems",
      term: "Fall",
      description: "Introduction to SQL and database design.",
    },
    {
      code: "OOB2203",
      name: "Object-Oriented Basics",
      term: "Summer",
      description: "Learn the basics of object-oriented programming.",
    },
  ]);

  // 🔹 Handle signup
  const handleSignup = (student) => {
    setStudents((prev) => [...prev, student]);
    alert("Signup successful! Please login now.");
  };

  // 🔹 Handle login
  const handleLogin = (username, password) => {
    const user = students.find(
      (s) => s.username === username && s.password === password
    );
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user)); // ✅ Save user
      alert(`Welcome back, ${user.username}!`);
    } else {
      alert("Invalid login! Try again.");
    }
  };

  // 🔹 Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser"); // ✅ Remove from storage
    alert("You have been logged out.");
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* 🔹 Global Header visible on all pages */}
        <Header currentUser={currentUser} onLogout={handleLogout} />

        <main className="flex-grow">
          <Routes>
            {/* ---------- Public Pages ---------- */}
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route
              path="/signup"
              element={<Signup onSignup={handleSignup} />}
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/courses" element={<Courses courses={courses} />} />
            <Route path="/contact" element={<Contact />} /> {/* ✅ New Contact Page */}

            {/* ---------- Profile Page ---------- */}
            <Route
              path="/profile"
              element={<Profile currentUser={currentUser} />}
            />

            {/* ---------- Sidebar Pages ---------- */}
            <Route
              path="/dashboard"
              element={<Dashboard currentUser={currentUser} />}
            />
            <Route
              path="/term-selection"
              element={<TermSelection currentUser={currentUser} />}
            />
            <Route
              path="/course-registration"
              element={<CourseRegistration currentUser={currentUser} />}
            />
            <Route
              path="/search-courses"
              element={<SearchCourses currentUser={currentUser} />}
            />
            <Route
              path="/contact-admin"
              element={<ContactAdmin currentUser={currentUser} />}
            />
          </Routes>
        </main>

        {/* 🔹 Footer stays global */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
