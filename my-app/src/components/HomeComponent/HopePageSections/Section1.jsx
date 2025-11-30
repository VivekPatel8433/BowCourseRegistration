import React from "react";
import { useNavigate } from "react-router";

export default function Section1() {
  const navigate = useNavigate();

  const handleClick = () => navigate("/Home/Courses");
  const register = () => navigate("Home/signup");

  return (
    <section className="overflow-hidden">
      <div className="w-full bg-gradient-to-r from-indigo-400 to-indigo-700 py-20 px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between">
        
        {/* TEXT CONTENT */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Build Your Future In
            <br /> Software Development
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
            Join Bow’s comprehensive Software Development programs and unlock 
            your potential in the tech industry. Choose from 
            <span className="font-semibold text-white"> Diploma</span>, 
            <span className="font-semibold text-white"> Post-Diploma</span>, 
            or <span className="font-semibold text-white"> Certificate</span> programs.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleClick}
              className="w-full sm:w-auto px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
            >
              View Programs
            </button>

            <button
              onClick={register}
              className="w-full sm:w-auto px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-700 transition"
            >
              Register Now
            </button>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/594ccf227e-d3eea5447f0f58ae00e8.png"
            alt="Software Development"
            className="w-full max-w-md rounded-xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
