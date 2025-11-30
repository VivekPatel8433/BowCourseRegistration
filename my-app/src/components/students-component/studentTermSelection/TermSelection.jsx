import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useStudent } from "../../../context/StudentContext";

const TermSelection = () => {
  const { selectedTerm, setSelectedTerm } = useStudent();
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    let currentTermName = "";
    let currentPeriod = "";

    if (month >= 1 && month <= 3) {
      currentTermName = `Winter ${year}`;
      currentPeriod = "Jan - Mar";
    } else if (month >= 4 && month <= 6) {
      currentTermName = `Spring ${year}`;
      currentPeriod = "Apr - Jun";
    } else if (month >= 7 && month <= 8) {
      currentTermName = `Summer ${year}`;
      currentPeriod = "Jul - Aug";
    } else if (month >= 9 && month <= 12) {
      currentTermName = `Fall ${year}`;
      currentPeriod = "Sep - Dec";
    }

    setTerms([
      {
        name: `Winter ${year}`,
        period: "Jan - Mar",
        status: currentTermName === `Winter ${year}` ? "Current" : "Available",
      },
      {
        name: `Spring ${year}`,
        period: "Apr - Jun",
        status: currentTermName === `Spring ${year}` ? "Current" : "Available",
      },
      {
        name: `Summer ${year}`,
        period: "Jul - Aug",
        status: currentTermName === `Summer ${year}` ? "Current" : "Available",
      },
      {
        name: `Fall ${year}`,
        period: "Sep - Dec",
        status: currentTermName === `Fall ${year}` ? "Current" : "Available",
      },
    ]);

    setSelectedTerm(currentTermName);
  }, []);

  return (
    <div className="w-full max-w-md bg-blue-50 p-6 rounded-xl border border-gray-200 font-sans">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaCalendarAlt className="text-blue-600 text-xl" />
        <div>
          <h2 className="text-lg font-semibold text-gray-900 m-0">
            Term Selection
          </h2>
          <p className="text-sm text-gray-500">
            Select your term for course registration
          </p>
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-2 gap-3">
        {terms.map((term) => (
          <div
            key={term.name}
            onClick={() => setSelectedTerm(term.name)}
            className={`p-4 border border-gray-200 rounded-lg cursor-pointer transition-all 
              ${
                selectedTerm === term.name
                  ? "border-blue-600 bg-blue-100 text-blue-700"
                  : "hover:border-blue-600"
              }
            `}
          >
            <h3 className="text-base font-semibold text-gray-900">
              {term.name}
            </h3>

            <p className="text-sm text-gray-500">{term.period}</p>

            <p
              className={`text-xs ${
                term.status === "Current"
                  ? "text-green-700 font-semibold"
                  : "text-blue-500"
              }`}
            >
              {term.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermSelection;
