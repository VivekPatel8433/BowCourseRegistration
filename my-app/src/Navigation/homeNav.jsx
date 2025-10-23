import React from "react";
import { FaGraduationCap  } from "react-icons/fa";
import { LogOutIcon } from "lucide-react";
import "./homeNav.css";
import { Link } from "react-router-dom";
const HomeNav = () => {

    const navItems = [
    { label: "Programs", path: "/" },
    { label: "Courses",  path: "/Home/courses" },
    { label: "About", path: "/" },
     { label: "Contact", path: "/" },
      { label: "Login", path: "/Home/login" },
       { label: "Signup", path: "/Home/signup" },
  

  ];
  return (
    <nav className="app-background home-nav">
      <div className="left-home">
        <FaGraduationCap className="logo-icon" />
        <div className="logo-text">
          <h1>Bow Course Registration</h1>
          <span>Software Development Department</span>
        </div>
      </div>   
     <div className="Homenav-links">
         {navItems.map((item)=>(
        <Link key={item.label} to={item.path} >
        {item.label}
        </Link>
         ) ) }
     </div>
      
    </nav>
  );
};

 export default  HomeNav;