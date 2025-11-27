import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import AdminHeader from '../Navigation/AdminNavigation/adminHeader';
import AdminSidebar from "../Navigation/AdminNavigation/adminSideBar";
import { AdminProvider } from "../context/AdminContext";

export default function AdminView() {
    return (
        <AdminProvider>
            <div className="min-h-screen flex flex-col">
                {/* Header */}
                <AdminHeader />
                
                {/* Main Content Area */}
                <div className="flex flex-1">
                    {/* Sidebar - Fixed width */}
                    <div className="w-64 flex-shrink-0">
                        <AdminSidebar />
                    </div>
                    
                    {/* Main Content - Takes remaining space */}
                    <main className="flex-1 bg-gray-50 p-6 overflow-auto">
                        <div className="max-w-7xl mx-auto">
                            <Outlet />
                        </div>
                    </main>
                </div>
                
                {/* Footer */}
                <Footer />
            </div>
        </AdminProvider>
    );
}