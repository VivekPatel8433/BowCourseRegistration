import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import HomeNav from "../Navigation/homeNav";

function View() {
  return (
    <>
    <HomeNav/>
      <Outlet />
      <Footer />
    </>
  );
}

export default View;
