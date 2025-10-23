import React from "react";
import "./Section5.css";

export default function Section5() {
  return (
    <section className="app-background section5">
      <div className="section5-container">
        <h2 className="section5-title">Ready to start your journey?</h2>
        <p className="section5-subtitle">
          Join thousands of students who have launched successful careers in
          software development through our comprehensive programs.
        </p>
        <div className="section5-buttons">
          <button className="btn5-primary">Get Started Today</button>
          <button className="btn5-secondary">Download Brochure</button>
        </div>
      </div>
    </section>
  );
}
