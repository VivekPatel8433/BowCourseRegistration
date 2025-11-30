import React, { useState } from "react";
import DashboardCards from "../components/admin-component/admin-dashboard-component/admin-dashboard-card-component/DashboardCards";
import Dashboard from "../components/admin-component/admin-dashboard-component/dash-board-component/dashboard";
import CourseManager from "../components/admin-component/admin-dashboard-component/dashboard-course/CourseManager";
import MessagesPanel from "../components/admin-component/admin-dashboard-component/dashboard-message/MessagesPanel";

export default function AdminPage(){
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            {/* Top Row - Two components */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="col-span-2">
                    <Dashboard />
                </div>
                <div className="col-span-2">
                    <DashboardCards />
                </div>
            </div>

            {/* Bottom Row - Two components side by side */}
            <div className="grid grid-cols-3 gap-6">
                {/* Left - CourseManager takes 2/3 width */}
                <div className="col-span-2">
                    <CourseManager />
                </div>
                
                {/* Right - MessagesPanel takes 1/3 width */}
                <div className="col-span-1">
                    <MessagesPanel />
                </div>
            </div>
        </div>
    )
}
