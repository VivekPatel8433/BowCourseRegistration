import React from "react";
import './home-style.css'
import styles from './home-page-style'
import logo from '../../assets/images/logo.png'

function Home () {
  return (
    <div className="home">
      <img src={logo} style={styles.log} alt="logo" />
      
      <div className="header">
        <p>Bow Course Registration</p>
        <p>Software Development Department</p>
      </div>
      
      <nav className="navbar" >
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
        
        <ul className="nav-list">
          <li className="nav-item"><a href="#">Programs</a></li>
          <li className="nav-item"><a href="#">Courses</a></li>
          <li className="nav-item"><a href="#">About</a></li>
          <li className="nav-item"><a href="#">Contact</a></li>
          <li className="nav-item login"><a href="#">Login</a></li>
          <li className="nav-item signup" ><a href="#" >Sign Up</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Home;
