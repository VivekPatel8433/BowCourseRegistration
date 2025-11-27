import React, { useEffect, useState } from "react";
import "./Section2.css";
import { useNavigate } from "react-router-dom"; 
import api from '../../../services/api'
export default function Section2() {
  const [programs,setPrograms]=useState([])
  const navigate=useNavigate()
  const learnMore=(id)=>{
    navigate("Home/courses",{state :{id}})
  }
  useEffect(()=>{
    const fetchPrograms =async () => {
      const res= await api.get("/programs")
      console.log({res})
      setPrograms(res.data.programs);
    }
   fetchPrograms();
  },[])
  return (
    <section className="app-background section2">
      <div className="section2-container">
        <div className="section2-header">
          <h2 className="section2-title">Our Programs</h2>
          <p className="section2-subtitle">
            Choose the program that fits your career goals and timelines
          </p>
        </div>

        <div className="section2-grid">
          {programs?.map((program) => (
            <div className="section2-card" key={program.id}>
              <h3 className="card-title">{program.name}</h3>
              <p className="card-description">{program.description}</p>

              <div className="card-features">
                <div className="feature">
                  <span className="feature-icon">⏳</span>
                  <span>{program.duration} year</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">💲</span>
                <span>
                 {program.fees?.domestic ?? "N/A"} Domestic / International {program.fees?.international ?? "N/A"}
                </span>

                </div>
                <div className="feature">
                  <span className="feature-icon">📅</span>
                  <span>{new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}</span>
                </div>
              </div>

              <button className="btn2-primary" onClick={() => learnMore(program.id)}>
                Learn More
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
