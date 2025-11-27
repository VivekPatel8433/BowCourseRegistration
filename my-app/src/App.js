import React,{useState } from "react";
import "./App.css";
import Home from "./pages/HomePage";
import { Routes, Route} from "react-router-dom";
import View from "./view/view";
import CourseOverview from "./components/HomeComponent/CourseOverView/CourseOverview";
import StudentView from "./view/StudentView";
import AdminView from "./view/AdminView"
import StudentPage from "./pages/StudentPage";
import { Navigate } from "react-router-dom";

import StudentProfile from "./components/students-component/student-profile/StudentProfile";
import ContactAdmin from "./components/students-component/ContactAdmin/ContactAdmin";
import AdminPage from "./pages/AdminPage";
import AdminProfile from "./components/admin-component/admin-profile-component/AdminProfile";
import CreateCourse from "./components/admin-component/admin-course-component/create-course-component/CreateCourse";

import StudentManagement from "./components/admin-component/admin-view-student-component/student-list-component/StudentManagement";
import MessageView from "./components/admin-component/admin-view-student-component/student-message-component/MessageView";
import Login from "./components/Login-Signup-component/Login";
import Signup from "./components/Login-Signup-component/Signup";

function App() {
    const [registeredUser, setRegisteredUser] = useState(null);
    const [message,setMessage]=useState(null)
  return (
    <div >{/*className="app-background" */}
      <Routes>
        {/* Home layout */}
        <Route element={<View />}>
          <Route index element={<Home />} />
          <Route path="Home/courses" element={<CourseOverview />} />
          <Route path="Home/login" element={<Login user={registeredUser}/>} />
          <Route path="Home/signup" element={<Signup onSignup={setRegisteredUser}/>} />
        </Route>

        {/* Student layout */}
        <Route path ="student" element={<StudentView />}>
          <Route index element={<StudentPage/>} />
            <Route path="dashboard" element={<Navigate to="/student" replace/>}/>
          <Route path="term-selection" element={<Navigate to="/student" replace />} />
          <Route path="course-registration" element={<Navigate to="/student" replace/>}/>
          <Route path ="profile" element={<StudentProfile/>}/>
          <Route path="contact-admin" element={<ContactAdmin sendMessage={setMessage}/>}/>
        </Route>

        {/*Admin layout */}
        <Route path="admin" element={<AdminView/>}>
          <Route index element ={<AdminPage/>}/>
          <Route path="dashboard" element={<Navigate to="/admin" replace/>}/>
          <Route path="profile" element={<AdminProfile/>}/>
          <Route path="create-course" element={<CreateCourse/>}/>
          <Route path="view-students" element={<Navigate to="/admin" replace/>}/>{/*<StudentManagement/> */}{/* view student disabled for now */}
          <Route path="messages" element={<MessageView viewMessage={message}/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
