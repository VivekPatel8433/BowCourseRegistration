export default function Section1() {
        return(
     <section>
       <div className="bg-[#3772FF] mx-auto px-6 py-20 flex">
              <div className="ml-4 md:ml-16 lg:ml-32">
              <h1 className=" text-4xl py-10 text-white text-bold">Build Your Future In <br></br>Software Development</h1>
              <h2 className="text-2xl text-bold">Join Bow's comprehensive Software Development programs <br></br>and unlock your potential in the tech industry. Choose from <div></div>Diploma, Post-Diploma, or Certificate programs.</h2>
         <div className="flex gap-4 mt-6">
             <button className="rounded-lg py-3 px-8 bg-white font-semibold hover: bg-gray-100">View Programs</button>
             <button className="border-2 border-white text-green px-8 py-3 rounded-lg font-semibold hover:bg-white">Register Now</button>
         </div>
      </div>

      <div className="relative mt-10">
        <img className="w-full h-64 rounded-2xl object-cover shadow-2xl hidden sm:block  md:ml-32" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/594ccf227e-d3eea5447f0f58ae00e8.png" alt="img"></img>
      </div>
    </div>
    </section>      
);
}