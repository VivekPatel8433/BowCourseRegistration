import './admin-styles.css';
import Sidebar from './admin-sidebar-component/admin-sidebar';
import DashboardCards from './admin-dashboard-card-component/DashboardCards';
import Dashboard from './dash-board-component/dashboard';
import Header from './admin-header-component/header';
import CourseManager from './dashboard-course/CourseManager';
import Line from '../line-component/line';
import React, { useState, useEffect } from 'react';
import MessagesPanel from './dashboard-message/MessagesPanel';
import { Outlet, useLocation } from 'react-router-dom';
import AdminProfile from '../admin-profile-component/AdminProfile'
import CreateCourse from '../admin-course-component/create-course-component/CreateCourse';
import AdminCourseManagement from '../admin-course-component/courrse-manager-component/AdminCourseManagement';
import StudentManagement from '../admin-view-student-component/student-list-component/StudentManagement';
import MessageView from '../admin-view-student-component/student-message-component/MessageView';

function AdminLayout() {
  const [offsetY, setOffsetY] = useState(-220);
  const width = window.innerWidth;
  const location = useLocation();
  //alert(location.pathname);
  // Define routes where sidebar should be hidden
  const sidebarHiddenRoutes = [
    '/admin/manage-courses', 
    '/admin/view-students',
    '/admin/messages' // Add this if you have a messages view route
  ];

  // Check if current path should hide sidebar
  const shouldHideSidebar = sidebarHiddenRoutes.includes(location.pathname);

  // Update offset based on screen size
  useEffect(() => {
    const handleResize = () => {
      const newOffsetY =
        width >= 1532 ? 70 :
        width >= 1528 ? 80 :
        width >= 1200 ? 70 :
        100;

      setOffsetY(newOffsetY);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  // Determine what to render based on current path
  const renderMainContent = () => {
    switch (location.pathname) {
      case '/admin/dashboard':
        return (
          <>
            <Dashboard />
            <DashboardCards />
            <CourseManager />
            <MessagesPanel />
          </>
        );
      case '/admin/profile':
        return <AdminProfile />;
      case '/admin/create-course':
        return <CreateCourse />;
      case '/admin/manage-courses':
        return <AdminCourseManagement />;
      case '/admin/view-students':
        return <StudentManagement />;
      case '/admin/messages':
        return <MessageView/>;
      default:
      
        // The Outlet will render the component defined in the router
        return <Outlet />;
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Always render header regardless of route */}
      <Header />

      {/* Conditionally render lines and sidebar based on route */}
      {!shouldHideSidebar ? (
        <>
          <Line
            direction="horizontal"
            thickness={1}
            color="rgba(0,0,0,0.16)"
            offsetY={offsetY}
          />
          <Line
            direction="vertical"
            thickness={1}
            color="rgba(0,0,0,0.16)"
            offsetX={250}
            offsetY={80}
          />
          <Sidebar />
        </>
      ) : (
        // Only show horizontal line when sidebar is hidden
        <Line
          direction="horizontal"
          thickness={1}
          color="rgba(0,0,0,0.16)"
          offsetY={offsetY}
        />
      )}

      {/* Render the appropriate content based on route */}
      {renderMainContent()}
    </div>
  );
}

export default AdminLayout;