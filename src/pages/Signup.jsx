// src/pages/Signup.jsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function strengthLabel(score) {
  if (score >= 4) return "Strong";
  if (score === 3) return "Good";
  if (score === 2) return "Weak";
  return "Very weak";
}

export default function Signup({ onSignup }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
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

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    if (!form.accept) return "Please accept the terms to continue.";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const msg = validate();
    if (msg) return setError(msg);

    const user = { name: form.name.trim(), email: form.email.trim(), photo: "" };
    onSignup?.(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-2">
        <div className="hidden md:block self-center">
          <h1 className="text-3xl font-bold text-indigo-700">Create your account 🚀</h1>
          <p className="mt-2 text-gray-600">Sign up in seconds. Keep it simple.</p>
        </div>

        <div className="w-full max-w-md md:ml-auto">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-center">Sign up</h2>
            <p className="mt-1 text-center text-sm text-gray-500">
              Join and start building your course plan
            </p>

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Full name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Rahul Mahyavanshi"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="you@example.com"
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
                    placeholder="At least 8 characters"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(s => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="mt-2">
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-indigo-600 transition-all"
                      style={{ width: `${(Math.min(pwdScore, 5) / 5) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Strength: {strengthLabel(pwdScore)}
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Confirm password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    className="w-full rounded-xl border-gray-300 px-3 py-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Re-enter your password"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="accept"
                  checked={form.accept}
                  onChange={handleChange}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                I agree to the terms and privacy policy.
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Create account
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>

            <p className="mt-4 text-center text-xs text-gray-500">
              Demo: any email + password works. You’ll go to the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
