import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./admin-layout";
import Dashboard from "./dash-board-component/dashboard";
import DashboardCards from "./admin-dashboard-card-component/DashboardCards";
import AdminProfile from "../admin-profile-component/AdminProfile";
import CreateCourse from "../admin-course-component/create-course-component/CreateCourse";
import AdminCourseManagement from "../admin-course-component/courrse-manager-component/AdminCourseManagement";
import StudentManagement from "../admin-view-student-component/student-list-component/StudentManagement";
import MessageView from "../admin-view-student-component/student-message-component/MessageView";
import CourseManager from "./dashboard-course/CourseManager";
import MessagesPanel from "./dashboard-message/MessagesPanel";

function AdminRouter() {
  return (
    <Routes>
      <Route path="/*" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={
          <>
            <Dashboard />
            <DashboardCards />
            <CourseManager />
            <MessagesPanel />
          </>
        } />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="create-course" element={<CreateCourse />} />
        <Route path="manage-courses" element={<AdminCourseManagement />} />
        <Route path="view-students" element={<StudentManagement />} />
        <Route path="messages" element={<MessageView />} />
      </Route>
    </Routes>
  );
}

export default AdminRouter;