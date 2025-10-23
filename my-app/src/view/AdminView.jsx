import React from "react";

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import AdminHeader from '../Navigation/AdminNavigation/adminHeader'
import AdminSidebar from "../Navigation/AdminNavigation/adminSideBar";
import {AdminProvider} from "../context/AdminContext";
export default function AdminView(){
    return (
      <AdminProvider>
            <AdminHeader/>
            <AdminSidebar/>
            <Outlet/>
            <Footer/>
      </AdminProvider>
    )
}