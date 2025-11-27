import React, { useEffect, useState } from "react";
import { useStudent } from "../../../../context/StudentContext";


export default function SearchCourses({onRegister}) {
  const { selectedTerm,courses } = useStudent(); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredCourses, setFilteredCourses] = useState([]); 

 console.log({courses})
 console.log({selectedTerm})
  useEffect(() => {
    const filtered = courses?.filter((c) => c?.term === selectedTerm.replace(/[0-9\s]/g, "")).slice(0, 5);
    setFilteredCourses(filtered);
  }, [selectedTerm]);


  useEffect(() => {
    if (!searchTerm) {           //str.replace(/[0-9\s]/g, ""); to extract non digit
 
      const filtered = courses?.filter((c) => c?.term === selectedTerm.replace(/[0-9\s]/g, ""))
        .slice(0, 5);
      setFilteredCourses(filtered);
      return;
    }

    const filtered = courses?.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, selectedTerm]);



  return (
  <div className="w-[110%] min-w-96 max-w-6xl relative top-4 left-4 ml-10">
      <div className="bg-indigo-100 rounded-xl shadow-sm border border-gray-200 p-6 w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                stroke="#2563eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="m-0 text-lg text-gray-900">Search Courses</h3>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2.5 mt-5 mb-5">
          <input
            type="text"
            placeholder="Search by course name or code..."
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-600 border-none rounded-lg p-2.5 cursor-pointer flex items-center justify-center hover:bg-blue-700 transition-colors" aria-label="Search">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Course List */}
        <div className="flex flex-col gap-3">
          {filteredCourses?.length > 0 ? (
            filteredCourses.map((c) => (
              <div key={c.code} className="flex justify-between items-start border border-gray-200 rounded-lg p-4 bg-indigo-300">
                <div className="flex flex-col gap-1.5">
                  <div className="font-semibold text-gray-900">
                    {c.code} - {c.name}
                  </div>
                  <div className="text-gray-600 text-sm">{c.description}</div>

                  <div className="flex items-center gap-5 mt-1.5 text-gray-500 text-xs">
                    <div className="flex items-center gap-1">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {c.term}
                    </div>

                   
                    <div className="meta">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 6v6l4 2"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                        />
                      </svg>
                      {`${new Date(c?.startDate).toLocaleDateString()} - ${new Date(c.endDate).toLocaleDateString()}`}
                    </div>
                    <div className="course-meta">
                    <div className="meta">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2v20M2 12h20"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{c.credit} Credits</span>
                    </div>
                  </div>
                  </div>
                </div>

                <button 
                  className="bg-indigo-500 text-white font-medium border-none rounded-lg px-4 py-2 cursor-pointer text-sm h-fit hover:bg-blue-700 transition-colors"
                  onClick={() => onRegister(c.code)}
                >
                  Register
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No courses found for {selectedTerm}</p>
          )}
        </div>
      </div>
    </div>
  );
}