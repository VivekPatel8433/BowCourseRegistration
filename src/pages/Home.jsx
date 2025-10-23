// src/pages/Home.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home({ currentUser }) {
  const navigate = useNavigate();

  return (
    <section className="relative">
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-500 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Bow Course Registration
          </h1>
          <p className="mt-3 text-white/90 max-w-2xl">
            Sign up or log in to explore courses, build your schedule, and access your dashboard.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {currentUser ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-xl bg-white px-5 py-2.5 text-indigo-700 font-medium hover:bg-white/90"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-xl bg-white px-5 py-2.5 text-indigo-700 font-medium hover:bg-white/90"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-xl border border-white/90 px-5 py-2.5 font-medium hover:bg-white/10"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-6 shadow-sm bg-white">
          <h3 className="text-lg font-semibold">Browse Courses</h3>
          <p className="mt-1 text-gray-600">Scan course info and prerequisites quickly.</p>
        </div>
        <div className="rounded-2xl border p-6 shadow-sm bg-white">
          <h3 className="text-lg font-semibold">Plan Your Term</h3>
          <p className="mt-1 text-gray-600">Pick a term and avoid time conflicts.</p>
        </div>
        <div className="rounded-2xl border p-6 shadow-sm bg-white">
          <h3 className="text-lg font-semibold">Stay Organized</h3>
          <p className="mt-1 text-gray-600">Your dashboard keeps everything in one place.</p>
        </div>
      </div>
    </section>
  );
}
