import React from "react";
import { FaUser, FaBook, FaEnvelope, FaDownload } from "react-icons/fa";
import "./QuickActions.css";
import { useNavigate } from "react-router-dom";

export default function QuickActions({progressBar}) {
  const navigate =useNavigate();
  const ViewProfile= ()=>{
    navigate("/Student/profile")
  }
  const contactAdmin=()=>{
    navigate("/Student/contact-admin")
  }
  
  return (
    <div className="quick-actions-card">
      <h2 className="title">Quick Actions</h2>

      <div className="Qactions">
        <button className="action active" onClick={ViewProfile}>
          <FaUser className="icon" />
          <span>View Profile</span>
        </button>

        <button className="action">
          <FaBook className="icon" />
          <span>Course Registration</span>
        </button>

        <button className="action" onClick={contactAdmin}>
          <FaEnvelope className="icon" />
          <span>Contact Admin</span>
        </button>

        <button className="action">
          <FaDownload className="icon" />
          <span>Download Schedule</span>
        </button>
      </div>

      <div className="divider" />

      <div className="status">
        <h3>Registration Status</h3>
        <p> Courses Registered: <strong>{`${progressBar.length}/5`}</strong></p>

        <div className="progress-bar">
          <div className="progress" style={{ width: `${(progressBar.length / 5) * 100}%` }}></div>
        </div>

        <p className="note">You can register for 2 more courses this term</p>
      </div>
    </div>
  );
}
