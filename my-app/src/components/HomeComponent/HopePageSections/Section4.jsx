import React from "react";
import "./Section4.css";

export default function Section4() {
  return (
    <section className="app-background section4">
      <div className="section4-container">
        <div className="section4-header">
          <h2 className="section4-title">Platform Features</h2>
          <p className="section4-subtitle">
            Everything you need for course registration and management
          </p>
        </div>

        <div className="section4-grid">
          {/* Student Portal */}
          <div className="feature-card">
            <h3 className="feature-title">Student Portal</h3>
            <ul className="feature-list">
              <li>1. Course registration (2 to 5 courses per term)</li>
              <li>2. Personal dashboard</li>
              <li>3. Profile management</li>
              <li>4. Course search functionality</li>
              <li>5. Contact form submission</li>
            </ul>
          </div>

          {/* Admin Panel */}
          <div className="feature-card">
            <h3 className="feature-title">Admin Panel</h3>
            <ul className="feature-list">
              <li>1. Create and edit courses</li>
              <li>2. View registered students</li>
              <li>3. Manage course schedules</li>
              <li>4. Review student messages</li>
              <li>5. Generate reports</li>
            </ul>
          </div>

          {/* System Features */}
          <div className="feature-card">
            <h3 className="feature-title">System Features</h3>
            <ul className="feature-list">
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
