import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

export default function Section2() {
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  const learnMore = (id) => {
    navigate("Home/courses", { state: { id } });
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      const res = await api.get("/programs");
      setPrograms(res.data.programs);
    };
    fetchPrograms();
  }, []);

  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Programs
          </h2>
          <p className="text-lg text-gray-600">
            Choose the program that fits your career goals and timelines.
          </p>
        </div>

        {/* GRID OF CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs?.map((program) => (
            <div
              key={program.id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all"
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {program.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6">
                {program.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {/* Duration */}
                <div className="flex items-center text-sm text-gray-700">
                  <span className="mr-3">⏳</span>
                  <span>{program.duration} year</span>
                </div>

                {/* Fees */}
                <div className="flex items-center text-sm text-gray-700">
                  <span className="mr-3">💲</span>
                  <span>
                    {program.fees?.domestic ?? "N/A"} Domestic / Intl{" "}
                    {program.fees?.international ?? "N/A"}
                  </span>
                </div>

                {/* Dates */}
                <div className="flex items-center text-sm text-gray-700">
                  <span className="mr-3">📅</span>
                  <span>
                    {new Date(program.startDate).toLocaleDateString()} –{" "}
                    {new Date(program.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* CTA BUTTON */}
              <button
                onClick={() => learnMore(program.id)}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
