import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import api from "../../../services/api"
const terms = ["Spring", "Summer", "Fall", "Winter"];

export default function CourseOverview() {
  const [programs,setPrograms]=useState([]);
  const [courses,setCourses]= useState([]);
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const location = useLocation();
  const { id } = location.state || {};
  
  useEffect(()=>{
    (async ()=>{
     const prog= await api.get("programs");
     console.log({prog})
     setPrograms(prog.data.programs)
    const cours=await api.get("/courses/all");
    console.log({cours})
    setCourses(cours.data.courses)
    })()
  
  },[])

  useEffect(() => {
    if (id) {
      const selectedProgram = programs?.find((p) => p._id === id);
      if (selectedProgram && selectedProgram.term) {
        setSelectedTerm(selectedProgram.term);
      }
    }
  }, [id]);

  const filteredPrograms = programs?.filter((program) => (id ? program._id === id : true))
    .map((program) => ({
      ...program,
      courses: courses.filter(
        (course) =>
          course.programId === program._id 
      ),
    }))
    .filter((program) => program.courses.length > 0);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Software Development Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive programs and courses designed to launch your career in technology
          </p>
        </div>

        {/* Term Filter - Centered */}
        <div className="flex items-center justify-center gap-4 mb-12 bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto">
          <label htmlFor="term-select" className="font-semibold text-gray-900 text-lg">
            Select Term:
          </label>
          <select
            id="term-select"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="px-6 py-3 rounded-xl border-2 border-gray-200 text-base bg-white text-gray-900 cursor-pointer hover:border-blue-500 transition-colors focus:outline-none focus:border-blue-500"
          >
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPrograms?.map((program) => (
            <div key={program.id} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              
              {/* Program Header with Icon */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {program.name} Program
                  </h2>
                  <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-semibold text-sm">
                    {program.duration} year
                  </span>
                </div>
              </div>

              {/* Program Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {program.description}
              </p>

              {/* Program Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-gray-500">Department</span>
                    <p className="text-gray-800">{program.department}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-500">Term</span>
                    <p className="text-gray-800">{selectedTerm}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-500">Domestic Fees</span>
                    <p className="text-gray-800">{program.fees?.domestic}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-gray-500">Start Date</span>
                    <p className="text-gray-800">{ new Date(program.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-500">End Date</span>
                    <p className="text-gray-800">{new Date(program.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-500">International Fees</span>
                    <p className="text-gray-800">{program.fees?.international}</p>
                  </div>
                </div>
              </div>

              {/* Courses Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-200">
                  Courses ({program?.courses?.length})
                </h3>
                <div className="space-y-4">
                  {program?.courses?.map((course) => (
                    <div key={course.id} className="bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg">
                            {course.code}: {course.name}
                          </h4>
                          <span className="text-sm text-blue-600 font-medium">Term: {course.terms.join(", ")}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                        {course.description}
                      </p>
                      <div className="text-xs text-gray-500 font-medium">
                        📅 {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPrograms?.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              No programs found for {selectedTerm} term
            </h3>
            <p className="text-gray-500">
              Try selecting a different term or check back later for updates.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}