import React, { useEffect, useState } from "react";
import axios from "axios";

import Section1 from "../components/HomeComponent/HopePageSections/Section1";
import Section2 from "../components/HomeComponent/HopePageSections/Section2";
import Section3 from "../components/HomeComponent/HopePageSections/Section3";
import Section4 from "../components/HomeComponent/HopePageSections/Section4";
import Section5 from "../components/HomeComponent/HopePageSections/Section5";

export default function HomePage() {
  const [programs, setPrograms] = useState([]);

  // FETCH PROGRAMS ON PAGE LOAD
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/programs");
        setPrograms(res.data);
      } catch (err) {
        console.error("Failed to fetch programs", err);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Section1 />
      <Section2 />
      <Section3 />

      {/* ----------------------------- */}
      {/* Our Programs Section */}
      {/* ----------------------------- */}
      <section className="max-w-7xl mx-auto py-16 px-6 mt-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Available Programs</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs && programs.length > 0 ? (
            programs.map((program) => (
              <div
                key={program.ProgramID || program._id}
                className="p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-bold text-indigo-700">
                  {program.ProgramName || program.name}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {program.Description || program.description}
                </p>

                <button
                  className="mt-4 text-indigo-600 font-medium hover:underline"
                  onClick={() =>
                    alert(
                      `Courses for ${program.ProgramName || program.name} will be displayed on the student page.`
                    )
                  }
                >
                  View Courses →
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading programs...</p>
          )}
        </div>
      </section>

      <Section4 />
      <Section5 />
    </div>
  );
}
