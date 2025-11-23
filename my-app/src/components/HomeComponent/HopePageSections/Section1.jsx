import React from "react";
import { useNavigate } from "react-router";

export default function Section1() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/Home/Courses");
  };
  
  const register = () => {
    navigate("Home/signup");
  };

  return (
    <section className="overflow-hidden">
      <div className="bg-gradient-to-r from-[#8a8fd6] to-[#5367B1] w-full mx-auto py-20 px-6 flex flex-col lg:flex-row items-center justify-between relative top-0">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:ml-8 xl:ml-16">
          <h1 className="text-3xl md:text-4xl text-white font-bold pb-6 md:pb-10">
            Build Your Future In <br />
            Software Development
          </h1>
          
          <h2 className="text-xl md:text-2xl font-bold text-white w-full lg:w-11/12">
            Join Bow's comprehensive Software Development programs <br />
            and unlock your potential in the tech industry. Choose from
            <div></div>Diploma, Post-Diploma, or Certificate programs.
          </h2>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button 
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold cursor-pointer border-none hover:bg-gray-200 transition-colors w-full sm:w-auto text-center"
              onClick={handleClick}
            >
              View Programs
            </button>
            
            <button 
              className="border-2 border-white text-green-400 px-6 py-3 rounded-lg font-semibold cursor-pointer bg-transparent hover:bg-white transition-colors w-full sm:w-auto text-center"
              onClick={register}
            >
              Register Now
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
          <img
            className="w-full max-w-md rounded-xl object-cover shadow-2xl"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/594ccf227e-d3eea5447f0f58ae00e8.png"
            alt="Software Development"
          />
        </div>
      </div>
    </section>
  );
}