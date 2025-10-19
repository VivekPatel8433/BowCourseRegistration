export default function Section5() {
    return(
         <section className="bg-[#3772FF] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl text-white font-bold mb-6">Ready to start your journey?</h2>
            <p className="text-xl text-blue-100 mb-4">
                Join thousands of students who have launched successful careers in software development through our comprehensive programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100">Get Started Today</button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 hover:text-black">Download Brochure</button>
            </div>
        </div>

    </section>
    );

   
}