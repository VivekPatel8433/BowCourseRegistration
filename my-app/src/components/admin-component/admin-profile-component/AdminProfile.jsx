import React, { useState, useEffect } from "react";
import { useAdmin } from "../../../context/AdminContext";
import api from "../../../services/api";
import {sanitizeInputs} from "../../../services/sanitizeInput"
const AdminProfile = () => {
  const { admin, login, updateAdmin } = useAdmin();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        firstName: admin.firstName || "",
        lastName: admin.lastName || "",
        email: admin.email || "",
        phone: admin.phone || "",
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await api.put(`/auth/user/profile`,sanitizeInputs(formData));
      console.log({formData})
      updateAdmin({
        ...admin,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email:formData.email,
        phone: formData.phone,
      });

      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: admin.firstName || "",
      lastName: admin.lastName || "",
      email: admin.email || "",
      phone: admin.phone || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center p-10">
      <div className="w-[420px] bg-white p-7 rounded-xl shadow-lg">
        <h2 className="text-center mb-6 text-xl font-semibold">Admin Profile</h2>

        <div className="flex flex-col gap-4">
          {["firstName", "lastName", "email", "phone"].map((field) => (
            <div className="flex flex-col" key={field}>
              <label className="font-semibold mb-1">
                {field === "firstName"
                  ? "First Name"
                  : field === "lastName"
                  ? "Last Name"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`px-3 py-2 border border-gray-300 rounded-lg ${
                  !isEditing ? "bg-gray-100 text-gray-600 cursor-not-allowed" : ""
                }`}
              />
            </div>
          ))}

          {isEditing ? (
            <div className="flex justify-center gap-3 mt-5">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold border-none cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button 
                className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold border-none cursor-pointer hover:bg-gray-700 transition-colors"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex justify-center mt-5">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold border-none cursor-pointer hover:bg-blue-700 transition-colors"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;