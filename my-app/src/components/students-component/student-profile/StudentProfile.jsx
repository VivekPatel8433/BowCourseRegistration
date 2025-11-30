import React, { useEffect, useState } from "react";


const StudentProfile = () => {
  const [profile, setProfile] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(profile.photo);
  const [saveClicked, setSaveClicked] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
    setSaveClicked(true);
  };

  useEffect(() => {
    if (saveClicked) {
      localStorage.setItem("currentUser", JSON.stringify(profile));
      setIsEditing(false);
      setSaveClicked(false);
    }
  }, [saveClicked, profile]);

  useEffect(() => {
    if (!currentUser) return;

    setProfile((prev) => ({
      ...prev,
      ...currentUser,
    }));

    if (currentUser.photo) {
      setPhotoPreview(currentUser.photo);
    }
  }, []);

  const readonlyFields = [
    { label: "Student ID", name: "studentId" },
    { label: "Birthday", name: "birthday" },
    { label: "Department", name: "department" },
    { label: "Program", name: "program" },
    { label: "Status", name: "status" },
  ];

  const editableFields = [
    { label: "First Name", name: "firstName", type: "text" },
    { label: "Last Name", name: "lastName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "phone", type: "tel" },
  ];

  return (
    <div className="max-w-2xl mx-auto my-10 p-6">
    <h2 className="text-2xl font-bold mb-6 ml-32">Student Profile</h2>

      <form>
        
        {/* Profile Info */}
        <div className="space-y-6">
          {/* Readonly Section */}
          <div className="p-5 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">
              Student Information
            </h3>
            {readonlyFields.map(({ label, name }) => (
              <div key={name} className="flex gap-4 py-2 border-b border-gray-200 last:border-b-0">
                <span className="font-medium text-gray-600 w-32">{label}:</span>
                <span className="text-gray-800 flex-1 text-left">{profile[name]}</span>
              </div>
            ))}
          </div>

          {/* Editable Section */}
          <div className="bg-gray-50 p-5 rounded-lg">
            {editableFields.map(({ label, name, type }) => (
              <label key={name} className="flex items-center mb-4">
                <span className="font-medium text-gray-600 w-32 mb-0">
                  {label}:
                </span>
                <input
                  type={type}
                  name={name}
                  value={profile[name]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required={isEditing}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 text-center">
          {isEditing ? (
            <div className="space-x-4">
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleEditToggle}
                className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleEditToggle}
              className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
