// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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

    const user = { name: form.email.split("@")[0], email: form.email, photo: "" };
    onLogin?.(user, { remember: form.remember });
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-2">
        <div className="hidden md:block self-center">
          <h1 className="text-3xl font-bold text-indigo-700">Welcome back 👋</h1>
          <p className="mt-2 text-gray-600">
            Log in to continue your course planning. Simple and fast.
          </p>
        </div>

        <div className="w-full max-w-md md:ml-auto">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-center">Log in</h2>
            <p className="mt-1 text-center text-sm text-gray-500">
              Use your email and password to sign in
            </p>

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border-gray-300 px-3 py-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(s => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember me
                </label>
                <Link to="/signup" className="text-sm text-indigo-600 hover:underline">
                  Create account
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Demo: any email + 6+ char password works.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
