import React from "react";

export default function Section4() {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Platform Features
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need for course registration and management
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* STUDENT PORTAL */}
          <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Student Portal
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>1. Course registration (2 to 5 courses per term)</li>
              <li>2. Personal dashboard</li>
              <li>3. Profile management</li>
              <li>4. Course search functionality</li>
              <li>5. Contact form submission</li>
            </ul>
          </div>

          {/* ADMIN PANEL */}
          <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Admin Panel
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>1. Create and edit courses</li>
              <li>2. View registered students</li>
              <li>3. Manage course schedules</li>
              <li>4. Review student messages</li>
              <li>5. Generate reports</li>
            </ul>
          </div>

          {/* SYSTEM FEATURES */}
          <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              System Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>1. Secure authentication</li>
              <li>2. Real-time updates</li>
              <li>3. Mobile responsive design</li>
              <li>4. Data validation</li>
              <li>5. Session management</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
