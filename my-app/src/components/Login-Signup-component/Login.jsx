import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ user }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: user?.email?? "", password: "", remember: true });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
    const currentUser = JSON.parse(localStorage.getItem("currentUser")); 
     
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function validate() {
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const msg = validate();
    if (msg) return setError(msg);
    if(currentUser.email !==form.email){setError("Invalid login") ;return}
    if(currentUser?.userType ==="student"||'')navigate("/student", { replace: true });
      else navigate("/admin", { replace: true });
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        

        <div className="login-form-wrapper">
          <div className="login-card">
            <h2>Log in</h2>
            <p className="subtitle">Use your email and password to sign in</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-field">
                  <input
                    type={showPwd ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="toggle-password"
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-footer">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                  />
                  Remember me
                </label>
                <Link to="/Home/signup" className="signup-link">
                  Create account
                </Link>
              </div>

              <button type="submit" className="login-btn">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
