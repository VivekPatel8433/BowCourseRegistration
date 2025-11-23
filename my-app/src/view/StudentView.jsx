import React from "react";
import TopNav from "../Navigation/StudentNavigation/topNav";
import SideNav from "../Navigation/StudentNavigation/sideNav";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { StudentProvider } from "../context/StudentContext";

export default function StudentView() {
  return (
    <StudentProvider>
      <div className="flex flex-col min-h-screen">
        <TopNav />
        <div className="flex flex-1">
          <SideNav />
          <main className="flex-1 p-6 bg-gray-50">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </StudentProvider>
  );
}