import React from "react";
import { FaGraduationCap  } from "react-icons/fa";
import { LogOutIcon } from "lucide-react";
import "../StudentNavigation/TopNav.css";  // use the same css of student
import { Link,useNavigate } from "react-router-dom";
import { loginInfo } from "../../data/Admin-mock-data";

const AdminHeader = () => {
const navigate=useNavigate();
   const navItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Students", path: "/admin/view-students" },
    { label: "Profile", path: "/admin/profile" },
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
         <div className="profile-image" ><img src={loginInfo.avatar} alt="Photo" /></div>
          <div className="profile-name">{loginInfo.name}</div>
          <div className="profile-role">Admin</div>
        </div>
      
        <div className="student-logout" onClick={Logout}> <LogOutIcon/></div>
      </div>
      
    </nav>
  );
};

export default AdminHeader;
