import React from "react";
import TopNav from "../Navigation/StudentNavigation/topNav";
import SideNav from "../Navigation/StudentNavigation/sideNav";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { StudentProvider } from "../context/StudentContext";

export default function StudentView() {
  return (
    <StudentProvider>
      <TopNav />
      <SideNav />
      <Outlet />
      <Footer />
    </StudentProvider>
  );
}
