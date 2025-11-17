// src/pages/Signup.jsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios"

function strengthLabel(score) {
  if (score >= 4) return "Strong";
  if (score === 3) return "Good";
  if (score === 2) return "Weak";
  return "Very weak";
}

function strengthClass(score) {
  if (score >= 4) return "strong";
  if (score === 3) return "good";
  if (score === 2) return "weak";
  return "very-weak";
}

export default function Signup({ onSignup }) {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("student"); // "student" or "admin"
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    department: "SD",
    program: "",
    username: "",
    password: "",
    confirm: "",
    accept: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const pwdScore = useMemo(() => {
    let s = 0;
    if (form.password.length >= 8) s++;
    if (/[A-Z]/.test(form.password)) s++;
    if (/[a-z]/.test(form.password)) s++;
    if (/\d/.test(form.password)) s++;
    if (/[^A-Za-z0-9]/.test(form.password)) s++;
    return s;
  }, [form.password]);

  // Program options based on SD department
  const programOptions = [
    "Software Development",
    "Web Development", 
    "Mobile Development",
    "Data Science",
    "Cloud Computing",
    "Cyber Security"
  ];

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
  }

  function handleUserTypeChange(type) {
    setUserType(type);
    // Reset form when switching between student and admin

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthday: "",
      department: "SD",
      program: "",
      username: "",
      password: "",
      confirm: "",
      accept: false,
    });
    setError("");
  }

  function validate() {
    if (!form.firstName.trim()) return "Please enter your first name.";
    if (!form.lastName.trim()) return "Please enter your last name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    
    // Phone validation only for students
    if (userType === "student" && !/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      return "Please enter a valid 10-digit phone number.";
    }
    
    // Birthday validation only for students
    if (userType === "student" && !form.birthday) return "Please enter your birthday.";
    
    // Department and program validation only for students
    if (userType === "student") {
      if (!form.department) return "Please select a department.";
      if (!form.program) return "Please select a program.";
    }
    
    if (!form.username.trim()) return "Please enter a username.";
    if (form.username.length < 3) return "Username must be at least 3 characters.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    if (!form.accept) return "Please accept the terms to continue.";
    return "";
  }

 async function handleSubmit(e) {
  e.preventDefault();
  const msg = validate();
  if (msg) return setError(msg);

  // Prepare data to send to backend
  const payload = {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    username: form.username.trim(),
    password: form.password,
    role: userType,  // "student" or "admin"
    studentData: userType === "student" ? {
      phone: form.phone,
      birthday: form.birthday,
      department: form.department,
      program: form.program,
    } : null
  };

  try {
    const res = await axios.post(
      "http://localhost:3001/api/auth/register",
      payload
    );

    console.log("Registration success:", res.data);

    // Store JWT token if backend returns it
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    // Redirect to login
    navigate("/Home/login", { replace: true });

  } catch (err) {
    console.error(err);

    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  }
}


  // Format phone number as user types
  function formatPhoneNumber(value) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  }

  function handlePhoneChange(e) {
    const formatted = formatPhoneNumber(e.target.value);
    setForm(prev => ({ ...prev, phone: formatted }));
  }

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <div className="signup-form-wrapper">
          <div className="signup-card">
            <h2>Sign up</h2>
            <p className="signup-subtitle">
              Create your account to access the platform
            </p>

            {/* User Type Toggle Buttons */}
            <div className="user-type-radio">
                <label className={`radio-label ${userType === 'student' ? 'active' : ''}`}>
                    <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={userType === 'student'}
                    onChange={() => handleUserTypeChange('student')}
                    />
                    <span className="radio-icon">👨‍🎓</span> Student
                </label>

                <label className={`radio-label ${userType === 'admin' ? 'active' : ''}`}>
                    <input
                    type="radio"
                    name="userType"
                    value="admin"
                    checked={userType === 'admin'}
                    onChange={() => handleUserTypeChange('admin')}
                    />
                    <span className="radio-icon">👩‍💼</span> Admin
                </label>
                </div>


            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Student-specific fields */}
              {userType === "student" && (
                <>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Birthday *</label>
                    <input
                      type="date"
                      name="birthday"
                      value={form.birthday}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Department *</label>
                      <select
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        required
                      >
                        <option value="SD">Software Development</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Program *</label>
                      <select
                        name="program"
                        value={form.program}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Program</option>
                        {programOptions.map(program => (
                          <option key={program} value={program}>
                            {program}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  required
                  minLength={3}
                />
              </div>

              <div className="form-group">
                <label>Password *</label>
                <div className="password-field">
                  <input
                    type={showPwd ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(s => !s)}
                    className="toggle-password"
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className={`strength-fill ${strengthClass(pwdScore)}`}
                    />
                  </div>
                  <p className="strength-label">
                    Strength: {strengthLabel(pwdScore)}
                  </p>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password *</label>
                <div className="password-field">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="toggle-password"
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="terms-label">
                <input
                  type="checkbox"
                  name="accept"
                  checked={form.accept}
                  onChange={handleChange}
                />
                I agree to the terms and privacy policy.
              </label>

              <button type="submit" className="signup-btn">
                Create {userType === "admin" ? "Admin" : "Student"} Account
              </button>

              <p className="login-link">
                Already have an account?{" "}
                <Link to="/Home/login">Sign in</Link>
              </p>
            </form>

            <p className="demo-note">
              * All fields are required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}