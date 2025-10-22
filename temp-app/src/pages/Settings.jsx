// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";

const Settings = ({ currentUser, setCurrentUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    photo: "", // 🔹 new photo field
  });
  const [message, setMessage] = useState("");

  // 🔹 Load user data on mount
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: currentUser.password || "",
        photo: currentUser.photo || "",
      });
    }
  }, [currentUser]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle profile photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file); // Convert to Base64 string
  };

  // 🔹 Handle save
  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email) {
      alert("Username and Email are required.");
      return;
    }

    const updatedUser = { ...currentUser, ...formData };
    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // update student list as well
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    const updatedStudents = allStudents.map((s) =>
      s.username === currentUser.username ? updatedUser : s
    );
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    setMessage("✅ Your settings have been saved successfully.");
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">
          Account Settings
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Update your profile information or change your password.
        </p>

        <form onSubmit={handleSave} className="space-y-6">
          {/* 🔹 Profile Photo Upload Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 mb-4">
              <img
                src={
                  formData.photo ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-sm"
              />
              <label
                htmlFor="photoUpload"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
                title="Upload new photo"
              >
                📸
              </label>
              <input
                id="photoUpload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-500">
              Click the camera icon to upload or change photo.
            </p>
          </div>

          {/* 🔹 Username */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* 🔹 Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* 🔹 Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="Enter new password"
            />
          </div>

          {/* 🔹 Save Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>

        {message && (
          <div className="mt-6 bg-green-100 text-green-700 p-3 rounded text-center">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
