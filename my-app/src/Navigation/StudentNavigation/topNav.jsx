import React from "react";
import { FaGraduationCap  } from "react-icons/fa";
import { LogOutIcon } from "lucide-react";
import "./TopNav.css";
import { Link,useNavigate } from "react-router-dom";
const TopNav = () => {
const navigate=useNavigate();
    const navItems = [
    { label: "Dashboard", path: "/student" },
    { label: "Courses",  path: "/student/course-registration" },
    { label: "Profile", path: "/student/profile" },
     { label: "Contact", path: "/student/contact-admin" },
  

  ];

  const Logout=()=>{
    navigate("/");
  }
  return (
    <nav className="top-nav">
      <div className="left-section">
        <FaGraduationCap className="logo-icon" />
        <div className="logo-text">
          <h1>Bow Course Registration</h1>
          <span>Software Development Department</span>
        </div>
      </div>   
     <div className="nav-links">
         {navItems.map((item)=>(
        <Link key={item.label} to={item.path} >
        {item.label}
        </Link>
         ) ) }
     </div>
      <div className="right-section">
        <div className="profile-info">
         <div className="profile-image" ><img src={'https://i.pravatar.cc/150?'} alt="Photo" /></div>
          <div className="profile-name">Sarah Johnson</div>
          <div className="profile-role">Student</div>
        </div>
      
        <div className="student-logout" onClick={Logout}> <LogOutIcon/></div>
      </div>
      
    </nav>
  );
};

export default TopNav;
