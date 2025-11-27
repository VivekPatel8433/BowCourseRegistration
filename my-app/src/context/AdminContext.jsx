import React, { createContext, useContext, useState, useEffect } from "react";
import api from '../services/api.js';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState({});
  const [login, setLogin] = useState({});
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState(0);
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);

  const [readId, setReadId] = useState(null);
  const [removedCourseId, setRemovedCourseId] = useState(null);
  const [deletedMessageId, setDeletedMessageId] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState(null);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const programsRes = await api.get('/programs');
        console.log({programsRes})
        setPrograms(programsRes.data.programs ?? []);
        setStudents(programsRes.data.data?.reduce((total, p) => total + p.TotalEnrolledStudents, 0) ?? 0);
      
        await fetchCourses();
        const adminRes = await api.get('/auth/user/loggedIn');
         console.log({adminRes})
        setAdmin(adminRes.data.user ?? {});
          setLogin(adminRes.data.user ?? {});
     

        const messagesRes = await api.get('/message');
        setMessages(messagesRes.data.messages ?? []);
        setUnreadMessages((messagesRes.data.messages ?? []).filter(msg => msg.status === 'unread'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch courses (can be called on creation or update)
  const fetchCourses = async () => {
    try {
      const res = await api.get('/courses/all');
      setCourses(res.data.courses ?? []);
      console.log({res})
    } catch (err) {
      console.error(err);
    }
  };


  // Handle local updates
  useEffect(() => {
    if (readId) setUnreadMessages(prev => prev.filter(msg => msg.id !== readId));
    if (removedCourseId) setCourses(prev => prev.filter(c => c.id !== removedCourseId));
    if (deletedMessageId) setMessages(prev => prev.filter(m => m.id !== deletedMessageId));
    if (updatedCourse) {
      setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    }
  }, [readId, removedCourseId, deletedMessageId, updatedCourse]);

  // CRUD functions
  const markMessageAsRead = (id) =>{ setReadId(id);console.log({id})};
  const deleteCourse = (id) => setRemovedCourseId(id);
  const deleteMessage = (id) => setDeletedMessageId(id);
  const updateCourse = (course) => setUpdatedCourse(course);
  const OnCourseCreation = async () => {
    try {
      console.log("Course is created")
      await fetchCourses(); // reload courses after creation
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
const updateAdmin = (updates) => {
  setAdmin((prev) => ({ ...prev, ...updates }));
};

  return (
    <AdminContext.Provider
      value={{
        admin,
        login,
        programs,
        courses,
        students,
        messages,
        unreadMessages,
        markMessageAsRead,
        deleteCourse,
        deleteMessage,
        updateCourse,
       OnCourseCreation,
       updateAdmin
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
