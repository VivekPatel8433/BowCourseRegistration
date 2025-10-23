import React, { useState } from "react";
import "./StudentProfile.css";

import { student } from "../../../data/students";

const StudentProfile = () => {
  const [profile, setProfile] = useState(student);
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(profile.photo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, photo: file });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saved Profile:", profile);
    setIsEditing(false);
  };

  // Non-editable fields (now at the top)
  const readonlyFields = [
    { label: "Student ID", name: "studentId" },
    { label: "Birthday", name: "birthday" },
    { label: "Department", name: "department" },
    { label: "Program", name: "program" },
    { label: "Status", name: "status" },
  ];

  // Editable fields
  const editableFields = [
    { label: "First Name", name: "firstName", type: "text" },
    { label: "Last Name", name: "lastName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "phone", type: "tel" },
  ];

  return (
    <div className="student-profile">
      <h2>Student Profile</h2>
      <form onSubmit={handleSave}>
        <div className="profile-photo">
          <img
            src={photoPreview || "https://via.placeholder.com/150?text=No+Photo"}
            alt="Profile"
          />
          {isEditing && (
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          )}
        </div>

        <div className="profile-info">
          {/* Non-editable fields grouped at the top */}
          <div className="readonly-section">
            <h3>Student Information</h3>
            {readonlyFields.map(({ label, name }) => (
              <div key={name} className="readonly-field">
                <span className="label">{label}:</span>
                <span className="value">{profile[name]}</span>
              </div>
            ))}
          </div>

          {/* Editable fields */}
          <div className="editable-section">
            {editableFields.map(({ label, name, type }) => (
              <label key={name}>
                <span>{label}:</span>
                <input
                  type={type}
                  name={name}
                  value={profile[name]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </label>
            ))}
          </div>
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button type="submit">Save</button>
              <button type="button" onClick={handleEditToggle}>
                Cancel
              </button>
            </>
          ) : (
            <button type="button" onClick={handleEditToggle}>
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;