import React, { useState } from 'react';
import './admin-profile.css';
import {adminData as AdminInfo} from '../../../data/Admin-mock-data'

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(AdminInfo)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(adminData);

  const handleEditToggle = () => {
    setFormData(adminData);
    setAdminData(formData);
    Object.assign(AdminInfo, formData);
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAdminData(prev => ({
        ...prev, avatar: imageUrl
      }));
    }
  }

  return (
    <div className="admin-profile">
      <div className="profile-header">
        <h1>Admin Profile</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          {/* Image and Change Button Section - 2vh height equivalent */}
          <div className="profile-image-section">
            <div className="avatar-container">
              <img 
                src={isEditing ? formData.avatar : adminData.avatar} 
                alt="Admin Avatar" 
                className="admin-avatar"
              />
              {!isEditing && (
                <button className="change-avatar-btn" onClick={handleEditToggle}>
                  Change Photo
                </button>
              )}
              {isEditing && (
                <input
                  type='file'
                  accept='image/*'
                  onChange={handlePhoto}
                  className='file-input'
                />
              )}
            </div>
          </div>

          {/* Profile Information Section - Rest of the space */}
          <div className="profile-info-section">
            {isEditing ? (
              <table className="profile-table edit-table">
                <tbody>
                  <tr className="form-row">
                    <td className="label-cell">
                      <label htmlFor="name">Full Name</label>
                    </td>
                    <td className="input-cell">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </td>
                  </tr>
                  <tr className="form-row">
                    <td className="label-cell">
                      <label htmlFor="email">Email</label>
                    </td>
                    <td className="input-cell">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </td>
                  </tr>
                  <tr className="form-row">
                    <td className="label-cell">
                      <label htmlFor="department">Department</label>
                    </td>
                    <td className="input-cell">
                      <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </td>
                  </tr>
                  <tr className="form-row">
                    <td className="label-cell">
                      <label htmlFor="phone">Phone</label>
                    </td>
                    <td className="input-cell">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </td>
                  </tr>
                  <tr className="form-actions-row">
                    <td colSpan="2" className="actions-cell">
                      <div className="form-actions">
                        <button 
                          className="btn btn-primary" 
                          onClick={handleEditToggle}
                        >
                          Save Changes
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="profile-table view-table">
                <tbody>
                  <tr className="info-row">
                    <td className="label-cell">
                      <span className="label">Full Name:</span>
                    </td>
                    <td className="value-cell">
                      <span className="value">{adminData.name}</span>
                    </td>
                  </tr>
                  <tr className="info-row">
                    <td className="label-cell">
                      <span className="label">Email:</span>
                    </td>
                    <td className="value-cell">
                      <span className="value">{adminData.email}</span>
                    </td>
                  </tr>
                  <tr className="info-row">
                    <td className="label-cell">
                      <span className="label">Role:</span>
                    </td>
                    <td className="value-cell">
                      <span className="value">{adminData.role}</span>
                    </td>
                  </tr>
                  <tr className="info-row">
                    <td className="label-cell">
                      <span className="label">Department:</span>
                    </td>
                    <td className="value-cell">
                      <span className="value">{adminData.department}</span>
                    </td>
                  </tr>
                  <tr className="info-row">
                    <td className="label-cell">
                      <span className="label">Phone:</span>
                    </td>
                    <td className="value-cell">
                      <span className="value">{adminData.phone}</span>
                    </td>
                  </tr>
                  <tr className="info-row">
                    <td className="label-cell">
                      <span className="label">Member Since:</span>
                    </td>
                    <td className="value-cell">
                      <span className="value">
                        {new Date(adminData.joinDate).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                  <tr className="actions-row">
                    <td colSpan="2" className="actions-cell">
                      <button 
                        className="btn btn-primary edit-btn"
                        onClick={handleEditToggle}
                      >
                        Edit Profile
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-item">
              <span>Last Login: </span>
              <span>Today, 09:42 AM</span>
            </div>
            <div className="stat-item">
              <span>Account Status:</span>
              <span className="status-active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;