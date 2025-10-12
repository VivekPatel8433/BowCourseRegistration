// What non-users see
// - View all programs
// - View all courses
// - Button to go to Signup
// - Button/link to Login (can be modal or separate page)

function Home() {
  return ( 
    <div>
      <section>
    <div className="bg-[#3772FF] mx-auto px-6 py-20 flex">
      <div className="ml-32">
        <h1 className=" text-4xl py-10 text-white text-bold">Build Your Future In <br></br>Software Development</h1>
        <h2 className="text-2xl text-bold">Join Bow's comprehensive Software Development programs <br></br>and unlock your potential in the tech industry. Choose from <div></div>Diploma, Post-Diploma, or Certificate programs.</h2>
      <div className="flex gap-4 mt-6">
        <button className="rounded-lg py-3 px-8 bg-white font-semibold hover: bg-gray-100">View Programs</button>
        <button className="border-2 border-white text-green px-8 py-3 rounded-lg font-semibold hover:bg-white">Register Now</button>
      </div>
      </div>

      <div className="relative mt-10">
        <img className="w-full h-64 rounded-2xl object-cover shadow-2xl ml-32" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/594ccf227e-d3eea5447f0f58ae00e8.png" alt="img"></img>
      </div>
    </div>
    </section>

    <section className="bg-white py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 py-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
          <p className="text-xl gray-600">Choose the program that fits your career goals and timelines</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl text-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Diploma Program</h3> 
          <p className="text-gray-600 mb-6">2 year comprehensive program covering Full-Stack Development, Databases and Software Engineering Principles</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post-Diploma</h2>
          <p className="text-gray-600 mb-6"></p>

        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl">Certificate</div>
      </div>

      </div>
    </section>
    </div>
  );
}

export default Home;