import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">Programs</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Diploma</li>
              <li>Post Diploma</li>
              <li>Certificate</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2  text-gray-400">
              <li>Student Portal</li>
              <li>Registration Help</li>
              <li>Technical Support</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Information</h4>
            <ul className="space-y-4 text-gray-400">
              <li>(403) 410-1400</li>
              <li>Info@bowvalley.ca</li>
              <li>Calgary, Alberta</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Careers</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Students</li>
              <li>Interships</li>
              <li>Alumini</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p>@2025 Bow Course Registration System. All Rights Reserved</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-slate-500 text-center">
        © {new Date().getFullYear()} Bow Course. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
