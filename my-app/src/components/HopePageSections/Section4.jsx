export default function Section4() {
    return(
    <section>
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto py-16">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Platform Features</h2>
                    <p className="text-xl text-gray-600">Everything you need for course registration and management</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-center">
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Student Portal</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>1. Course registration (2 to 5 courses per term)</li>
                                <li>2. Personal dashboard</li>
                                <li>3. Profile management</li>
                                <li>4. Course search functionality</li>
                                <li>5. Contact form submission</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Admin Panel</h3>
                             <ul className="text-gray-600 space-y-2">
                                <li>1. Create and edit courses</li>
                                <li>2. View registered students</li>
                                <li>3. Manage course schedules</li>
                                <li>4. Review student messages</li>
                                <li>5. Generate reports</li>
                            </ul>
                        </div>
                    </div>

                     <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">System Features</h3>
                                <ul className="text-gray-600 space-y-2">
                                <li>1. Secure authentication</li>
                                <li>2. Real-time updates</li>
                                <li>3. Mobile responsive design</li>
                                <li>4. Data validation</li>
                                <li>5. Session management</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
        
    </section> 
    );
}
