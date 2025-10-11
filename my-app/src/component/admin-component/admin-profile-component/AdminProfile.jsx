import React, { useState } from 'react';
import './admin-profile.css';
import {adminData as AdminInfo} from '../../../data/Admin-mock-data'
const AdminProfile = () => {
  
 const[adminData,setAdminData] =useState(AdminInfo)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(adminData);

  const handleEditToggle = () => {
   
      // Save changes
       setFormData(adminData);
      setAdminData(formData);
      Object.assign(AdminInfo,formData);
    
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
  // pick photo
   const handlePhoto= (e)=>{

    const file= e.target.files[0];
    if(file){
      const imageUrl= URL.createObjectURL(file);

      setAdminData(prev=>({
        ...prev,avatar:imageUrl
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
          <div className="profile-avatar-section">
            <div className="avatar-container">
              <img 
                src={isEditing?formData.avatar:adminData.avatar} 
                alt="Admin Avatar" 
                className="admin-avatar"
              />
               {!isEditing && (
                <button className="change-avatar-btn" onClick={handleEditToggle}>
                  Change Photo
                </button>
              )}
              {isEditing &&(
             <input
              type='file'
              accept='image/*'
              onChange={handlePhoto}
              className='file-input'
             />

              )}
             
            </div>
          </div>

          <div className="profile-info-section">
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

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
              </div>
            ) : (
              <div className="view-mode">
                <div className="info-item">
                  <span className="label">Full Name:</span>
                  <span className="value">{adminData.name}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{adminData.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Role:</span>
                  <span className="value">{adminData.role}</span>
                </div>
                <div className="info-item">
                  <span className="label">Department:</span>
                  <span className="value">{adminData.department}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{adminData.phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">Member Since:</span>
                  <span className="value">
                    {new Date(adminData.joinDate).toLocaleDateString()}
                  </span>
                </div>

                <button 
                  className="btn btn-primary edit-btn"
                  onClick={handleEditToggle}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional profile sections can be added here */}
        <div className="profile-stats">
          <div className="stat-card">
          
            <div className="stat-item">
              <span>Last Login: </span>
              <span>Today, 09:42 AM</span>
            </div>
            <div className="stat-item">
              <span>Account Status:</span>
              <br />
              <span className="status-active"> Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;