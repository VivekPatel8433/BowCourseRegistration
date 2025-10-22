// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";

const Profile = ({ currentUser }) => {
  const [editableUser, setEditableUser] = useState(currentUser || {});
  const [isEditing, setIsEditing] = useState(false);

  // Load current user from localStorage if available
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      setEditableUser(savedUser);
    } else if (currentUser) {
      setEditableUser(currentUser);
    }
  }, [currentUser]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  // Save updates
  const handleSave = () => {
    localStorage.setItem("currentUser", JSON.stringify(editableUser));
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  if (!editableUser || !editableUser.username) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        <p className="text-lg">
          Please{" "}
          <a href="/login" className="text-blue-600 underline">
            log in
          </a>{" "}
          to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          👤 My Profile
        </h2>

        <div className="space-y-4 text-gray-700">
          <div>
            <label className="block font-semibold text-gray-800">Username</label>
            <input
              type="text"
              name="username"
              value={editableUser.username || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border rounded-md px-3 py-2 mt-1 ${
                isEditing ? "border-blue-500" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-800">Email</label>
            <input
              type="email"
              name="email"
              value={editableUser.email || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border rounded-md px-3 py-2 mt-1 ${
                isEditing ? "border-blue-500" : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-800">Password</label>
            <input
              type="password"
              name="password"
              value={editableUser.password || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border rounded-md px-3 py-2 mt-1 ${
                isEditing ? "border-blue-500" : "bg-gray-100"
              }`}
            />
          </div>
        </div>

        <div className="mt-8 text-center space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
