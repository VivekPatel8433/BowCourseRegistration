import React from "react";
import "./Section1.css";
import { useNavigate } from "react-router";
export default function Section1() {
   const navigate = useNavigate();
   const handleClick = () => {
    navigate("/Home/Courses"); // navigate to this route
  };
  const register = ()=>{
    navigate("Home/signup");
  }
  return (
    <section>
      <div className="app-background section1-container">
        <div className="section1-text">
          <h1 className="section1-title">
            Build Your Future In <br />
            Software Development
          </h1>
          <h2 className="section1-subtitle">
            Join Bow's comprehensive Software Development programs <br />
            and unlock your potential in the tech industry. Choose from
            <div></div>Diploma, Post-Diploma, or Certificate programs.
          </h2>
          <div className="section1-buttons">
            <button className="btn-primary" onClick={handleClick}>View Programs</button>
            <button className="btn-secondary" onClick={register}>Register Now</button>
          </div>
        </div>

        <div className="section1-image-container">
          <img
            className="section1-image"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/594ccf227e-d3eea5447f0f58ae00e8.png"
            alt="Software Development"
          />
        </div>
      </div>
    </section>
  );
}
