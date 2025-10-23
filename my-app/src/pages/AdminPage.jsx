import React, { useState } from "react";
import DashboardCards from "../components/admin-component/admin-dashboard-component/admin-dashboard-card-component/DashboardCards";
import Dashboard from "../components/admin-component/admin-dashboard-component/dash-board-component/dashboard";
import CourseManager from "../components/admin-component/admin-dashboard-component/dashboard-course/CourseManager";
import MessagesPanel from "../components/admin-component/admin-dashboard-component/dashboard-message/MessagesPanel";

export default function AdminPage(){
    return (
        <>
        <Dashboard/>
        <DashboardCards/>
        <CourseManager/>
        <MessagesPanel/>
        </>
    )
}