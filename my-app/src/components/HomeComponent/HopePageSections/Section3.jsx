import React from "react";

export default function Section3() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Academic Terms
          </h2>
          <p className="text-lg text-gray-600">
            Flexible scheduling to fit your lifestyle
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* SPRING */}
          <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-2xl text-center shadow-sm hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Spring
            </h3>
            <p className="text-gray-700 text-sm">March – June</p>
          </div>

          {/* SUMMER */}
          <div className="bg-yellow-50 border border-yellow-100 p-8 rounded-2xl text-center shadow-sm hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Summer
            </h3>
            <p className="text-gray-700 text-sm">March – June</p>
          </div>

          {/* FALL */}
          <div className="bg-orange-50 border border-orange-100 p-8 rounded-2xl text-center shadow-sm hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Fall
            </h3>
            <p className="text-gray-700 text-sm">September – December</p>
          </div>

          {/* WINTER */}
          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl text-center shadow-sm hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Winter
            </h3>
            <p className="text-gray-700 text-sm">January – February</p>
          </div>

        </div>
      </div>
    </section>
  );
}
