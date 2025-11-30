import React from "react";

export default function Section5() {
  return (
    <section className="bg-indigo-700 py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to start your journey?
        </h2>

        {/* SUBTITLE */}
        <p className="text-lg text-indigo-100 mb-10">
          Join thousands of students who have launched successful careers in 
          software development through our comprehensive programs.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          
          {/* Primary Button */}
          <button className="px-8 py-3 bg-white text-indigo-700 font-semibold text-lg rounded-lg shadow hover:bg-gray-100 transition">
            Get Started Today
          </button>

          {/* Secondary Button */}
          <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold text-lg rounded-lg hover:bg-white hover:text-indigo-700 transition">
            Download Brochure
          </button>
        </div>

      </div>
    </section>
  );
}
