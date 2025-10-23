import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export  function AdminProvider({ children }) {
  const [readId, setReadId] = useState(null);
  const [removedCourseId, setRemovedCourseId] = useState(null);
  const [deletedMessageId,setDeletedMessageId]=useState(null)
  return (
    <AdminContext.Provider value={{ readId, setReadId, removedCourseId, setRemovedCourseId ,deletedMessageId,setDeletedMessageId}}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin= ()=>useContext(AdminContext);