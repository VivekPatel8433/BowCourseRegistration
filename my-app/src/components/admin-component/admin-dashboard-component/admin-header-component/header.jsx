import React, { useEffect, useState} from "react";
import { LogOut, GraduationCap } from "lucide-react";
import { NavLink,useNavigate } from "react-router-dom";
import "./Header.css";
import { loginInfo } from "../../../../data/Admin-mock-data";

export default function Header() {
   const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Courses", path: "/admin/manage-courses" },
    { label: "Students", path: "/admin/view-students" },
    { label: "Profile", path: "/admin/profile" },
  ];

  const [login,setLogin] =useState({})
  useEffect(()=>{
    setLogin(loginInfo)
  },[])

   const handleLogout = () => {
    // optional: clear login info or tokens
    setLogin({});
    // redirect to home
    navigate("/");
  };
  return (
    <header className="header">
      {/* Left: Logo + Title */}
      <div className="header-left">
        <GraduationCap className="logo" style={{ color: "white" }} />
        <div className="header-text">
          <h1 className="title">Bow Course Registration</h1>
          <p className="subtitle">Software Development Department</p>
        </div>
      </div>

      {/* Center: Navigation */}
      <nav className="header-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Right: Profile */}
      <div className="header-profile">
        <img
          src={login.avatar??'https://i.pravatar.cc/150?img=3'}
          alt="John Smith"
          className="avatar"
        />
        <div className="profile-text">
          <span className="name">{login.name??'Unknown Name'}</span>
          <span className="role">Administrator</span>
        </div>
       <LogOut className="logout-icon" onClick={handleLogout} />
      </div>
    </header>
  );
}
