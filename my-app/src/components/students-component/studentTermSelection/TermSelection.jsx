import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./TermSelection.css";
import { useStudent } from "../../../context/StudentContext";
const terms = [
  {
    name: "Winter 2025",
    period: "Jan - Mar",
    status: "Current"
  },
  {
    name: "Spring 2025",
    period: "Mar - Jun",
    status: "Available"
  },
  {
    name: "Summer 2025",
    period: "Jun - Aug",
    status: "Available"
  },
  {
    name: "Fall 2025",
    period: "Sep - Dec",
    status: "Available"
  }
];

const TermSelection = () => {
   const { selectedTerm, setSelectedTerm } = useStudent(); // ✅ from context



  return (
    <div className="term-selection-container">
      <div className="term-header">
        <FaCalendarAlt className="calendar-icon" />
        <div>
          <h2>Term Selection</h2>
          <p>Select your term for course registration</p>
        </div>
      </div>

      <div className="terms-grid">
        {terms.map((term) => (
          <div
            key={term.name}
            className={`term-card ${selectedTerm === term.name ? "selected" : ""}`}
            onClick={() => setSelectedTerm(term.name)}
          >
            <h3>{term.name}</h3>
            <p className="term-period">{term.period}</p>
            <p className={`term-status ${term.status === "Current" ? "current" : ""}`}>
              {term.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermSelection;
