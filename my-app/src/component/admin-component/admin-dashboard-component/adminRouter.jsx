import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./admin-layout";
import DashboardCards from "./admin-dashboard-card-component/DashboardCards";
import CourseManager from "./dashboard-course/CourseManager";
import MessagesPanel from "./dash-message/MessagesPanel";
import CreateCourse from "../admin-course-component/create-course-component/CreateCourse";

function AdminRouter() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to admin dashboard */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        
        {/* All admin routes wrapped with layout */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Redirect /admin to /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />
          
          {/* Dashboard page - components rendered directly in AdminLayout */}
          <Route path="dashboard" element={null} />
          
          {/* Profile page - component rendered directly in AdminLayout */}
          <Route path="profile" element={null} />
          <Route path="create-course" element={null} />
          <Route path="manage-courses" element={null} />
          <Route path="view-students" element={null} />
           <Route path="messages" element={null}/>
          {/* Other pages - will render through Outlet */}
          <Route path="cards" element={<DashboardCards />} />
          <Route path="courses" element={<CourseManager />} />
          <Route path="messages" element={<MessagesPanel />} />
         {/* <Route path="/admin/create-course" element={<CreateCourse />} />*/} 

        </Route>
        
        {/* Handle 404 - redirect to admin dashboard */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default AdminRouter;