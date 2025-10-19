import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";
function View() {
  const location = useLocation();
    // Check if current path is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {!isAdminRoute && <Header />}

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default View;