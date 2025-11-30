import React from "react";
import StudentNavbar from "../Navigation/StudentNavigation/TopNav.jsx";
import SideNav from "../Navigation/StudentNavigation/SideNav.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { StudentProvider } from "../context/StudentContext";

export default function StudentView() {
  return (
    <StudentProvider>
      <div className="flex flex-col min-h-screen">
        
        {/* Top Navigation */}
        <StudentNavbar />

        <div className="flex flex-1">
          
          {/* Sidebar Navigation */}
          <SideNav />

          {/* Dynamic routed pages */}
          <main className="flex-1 p-6 bg-gray-50">
            <Outlet />
          </main>

        </div>

        {/* Footer */}
        <Footer />
      </div>
    </StudentProvider>
  );
}
