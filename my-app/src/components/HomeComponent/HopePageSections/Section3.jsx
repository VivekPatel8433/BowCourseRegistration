import React from "react";
import "./Section3.css";

export default function Section3() {
  return (
    <section className="app-background section3">
      <div className="section3-container">
        <div className="section3-header">
          <h2 className="section3-title">Academic Terms</h2>
          <p className="section3-subtitle">Flexible scheduling to fix your lifestyle</p>
        </div>

        <div className="section3-grid">
          <div className="term-card">
            <h3 className="term-title">Spring</h3>
            <p className="term-duration">March - June</p>
          </div>

          <div className="term-card">
            <h3 className="term-title">Summer</h3>
            <p className="term-duration">March - June</p>
          </div>

          <div className="term-card">
            <h3 className="term-title">Fall</h3>
            <p className="term-duration">September - December</p>
          </div>

          <div className="term-card">
            <h3 className="term-title">Winter</h3>
            <p className="term-duration">January - February</p>
          </div>
        </div>
      </div>
    </section>
  );
}
