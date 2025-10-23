// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";



export default function App() {
  // Persisted auth state (kept so Login/Signup work as-is)
  const [currentUser, setCurrentUser] = React.useState(() => {
    try {
      const raw = localStorage.getItem("currentUser");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  function handleLogin(user, { remember } = { remember: true }) {
    setCurrentUser(user);
    if (remember) localStorage.setItem("currentUser", JSON.stringify(user));
  }

  function handleSignup(user) {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  return (
    <BrowserRouter>
      
      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          {/* Everything else → Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      
    </BrowserRouter>
  );
}
