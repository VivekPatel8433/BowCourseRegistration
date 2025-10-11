import React, { useEffect, useState } from "react";
import { Mail, BookOpen, Users, GraduationCap } from "lucide-react";
import "./dashboard.css";
import { loginInfo, adminData,programs,courses} from "../../../../data/Admin-mock-data";
import { students } from "../../../../data/students";
import {messages} from '../../../../data/messages'
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

export default function Dashboard() {
  const[login,setLogin]=useState({})
  const [admin, setAdmin] = useState({});
  const [programsList, setProgramsList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [unread,setUnread]=useState([])
  
 useEffect(() => {
    setLogin(loginInfo);
    setAdmin(adminData);
     
    // Set other data lists
    setProgramsList(programs);
    setCoursesList(courses);
    setStudentsList(students);
    setMessagesList(messages);


  }, []); 

 useEffect(() => {
  if (messagesList) {
    const filteredMessages = messagesList.filter( (message) => message.status === "unread" );
    setUnread(filteredMessages);
  }
}, [messagesList]);  // ✅ watch messagesList, not unread


  useEffect(() => {
    if (login.id && admin.id && login.id !== admin.id) {
      console.log("Login and Admin IDs don't match");
      // Handle the mismatch here
    }
  }, [login, admin]); // This runs whenever login or admin changes
  
   // Calculate statistics based on your data
  const stats = {
    totalCourses: coursesList.length,
    totalStudents: studentsList.length,
    totalPrograms: programsList.length,
    totalMessages: messagesList.length,
    newMessages: messagesList.filter(msg => msg.status === 'unread').length
  };
  const programNames = programs.map(p => p.name).join(", ");

console.log(programNames);
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header">
        <h1 className="header-title">Administrator Dashboard</h1>
        <p className="header-subtitle" style={{fontSize: "1vw",fontWeight:"normal",color:"inherit"}}>
          Welcome back, {admin.name }! Manage courses and monitor student activities.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="cards-grid">
        {/* Total Courses */}
        <Card>
          <CardContent>
            <div className="icon-row">
              <BookOpen className="icon blue" />
              <span className="badge blue">Active</span>
            </div>
            <h2>Total Courses</h2>
            <p className="big-number blue">{stats.totalCourses??0}</p>
            <p className="small-text">Across all terms</p>
          </CardContent>
        </Card>

        {/* Total Students */}
        <Card>
          <CardContent>
            <div className="icon-row">
              <Users className="icon green" />
              <span className="badge green">Active</span>
            </div>
            <h2>Total Students</h2>
            <p className="big-number green">{stats.totalStudents??0}</p>
            <p className="small-text">Enrolled students</p>
          </CardContent>
        </Card>

        {/* Programs */}
        <Card>
          <CardContent>
            <GraduationCap className="icon purple" />
            <h2>Programs</h2>
            <p className="big-number purple">{stats.totalPrograms??0}</p>
            <p className="small-text">{programNames}</p>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card>
          <CardContent>
            <div className="icon-row">
              <Mail className="icon orange" />
              <span className="badge red">{unread.length??0} New</span>
            </div>
            <h2>Messages</h2>
            <p className="big-number orange">{stats.totalMessages??0}</p>
            <p className="small-text">Student inquiries</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
