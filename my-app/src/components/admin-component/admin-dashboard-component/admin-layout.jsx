import './admin-styles.css';
import Sidebar from './admin-sidebar-component/admin-sidebar';
import Header from './admin-header-component/header';
import Line from '../line-component/line';
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

function AdminLayout() {
  const [offsetY, setOffsetY] = useState(-220);
  const width = window.innerWidth;
  const location = useLocation();

  // Define routes where sidebar should be hidden
  const sidebarHiddenRoutes = [
    '/admin/manage-courses', 
    '/admin/view-students',
    '/admin/messages'
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

      {/* Router Outlet will render the appropriate component */}
      <Outlet />
    </div>
  );
}

export default AdminLayout;