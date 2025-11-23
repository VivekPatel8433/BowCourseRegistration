import React, { useState,useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useStudent } from "../../../context/StudentContext";

const TermSelection = () => {
  const { selectedTerm, setSelectedTerm } = useStudent(); //  from context
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const year = now.getFullYear();

    // Determine current term and period
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

    // Build dynamic terms array
    setTerms([
      { name: `Winter ${year}`, period: "Jan - Mar", status: currentTermName === `Winter ${year}` ? "Current" : "Available" },
      { name: `Spring ${year}`, period: "Apr - Jun", status: currentTermName === `Spring ${year}` ? "Current" : "Available" },
      { name: `Summer ${year}`, period: "Jul - Aug", status: currentTermName === `Summer ${year}` ? "Current" : "Available" },
      { name: `Fall ${year}`, period: "Sep - Dec", status: currentTermName === `Fall ${year}` ? "Current" : "Available" },
    ]);

    // Set default selected term to current
    setSelectedTerm(currentTermName);
  }, []);


  return (
<div className="max-w-[400px] h-[350px] p-6 rounded-xl border border-gray-200 bg-blue-50 font-sans relative top-6 ml-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaCalendarAlt className="text-blue-600 text-xl" />
        <div>
          <h2 className="m-0 text-lg font-semibold text-gray-900">Term Selection</h2>
          <p className="mt-0.5 text-sm text-gray-500 mb-0">
            Select your term for course registration
          </p>
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-2 gap-3">
        {terms.map((term) => (
          <div
            key={term.name}
            className={`border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              selectedTerm === term.name 
                ? "border-blue-600 bg-blue-50 text-blue-700" 
                : "hover:border-blue-600"
            }`}
            onClick={() => setSelectedTerm(term.name)}
          >
            <h3 className="m-0 text-base font-semibold text-gray-900">{term.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5 mb-1">{term.period}</p>
            <p className={`text-xs ${
              term.status === "Current" 
                ? "text-green-800 font-semibold" 
                : "text-blue-600"
            }`}>
              {term.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermSelection;