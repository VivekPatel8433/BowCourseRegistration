import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true
  });

  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function validate() {
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const msg = validate();
    if (msg) return setError(msg);

    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email: form.email,
          password: form.password
        },
        { withCredentials: true } // optional, depending on JWT storage
      );

      // Save token & user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));

      // Redirect based on role
      if (res.data.user.role === "student") {
        navigate("/student", { replace: true });
      } else {
        navigate("/admin", { replace: true });
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password.");
    }
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((p) => !p)}
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
