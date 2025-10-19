import React, { useEffect, useState } from "react";
import "./MessagesPanel.css";
import {messages} from '../../../../data/messages'
import { useNavigate } from "react-router-dom";

const MessagesPanel = () => {
  const imagePlaceHolder="https://api.dicebear.com/6.x/pixel-art/png?size=100";
const [unread,setUnread]=useState([]) 
const [read,setRead] =useState([])
const navigate= useNavigate();

useEffect(() => {
  setUnread(prev => {
    const newUnread = messages.filter(m => m.status === "unread");
    return [...prev, ...newUnread.filter(m => !prev.some(p => p.id === m.id))];
  });
  setRead(prev=>{
    const readMessages=messages.filter(r=>r.status !=="unread");
    return[...prev,...readMessages.filter(r=>!prev.some(p=>p.id===r.id))]
  })
}, [messages]);

const sortedUnread = [...unread].sort(
  (a, b) => new Date(a.submissionDate) - new Date(b.submissionDate)
);

const sortedRead = [...read].sort(
  (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
);

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date; // difference in milliseconds

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const weeks   = Math.floor(days / 7);
  const months  = Math.floor(days / 30);
  const years   = Math.floor(days / 365);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}
const topMessages = (() => {
  const remaining = Math.min(3 - sortedUnread.length,sortedRead.length);

  if (sortedUnread.length >= 3) {
    return sortedUnread.slice(0, 3);
  } else if (sortedUnread.length === 0) {
    return sortedRead.slice(0, 3);
  } else {
    // unread.length < 3 → fill the rest from messages
    return [...sortedUnread, ...sortedRead.slice(0, remaining)];
  }
})();
  
const ViewAllMessages = (id = null,name=null) => {
  if (id) {
    
    navigate("/admin/messages", {  state: { messageId: id } });
    
  } else {
  
    navigate("/admin/messages");
  }
};

const CreateNewCourse=()=>{
 navigate("/admin/create-course")

}

  return (
    <div className="messages-panel">
      <div className="messages-list">
        {topMessages.map((msg, index) => (
          
          <div
            key={index}
            className={`message-card ${msg.status === "unread" ? "new" : ""}`}
            onClick={()=>ViewAllMessages(msg.id??null,msg.studentName??null)}
          >
            <img src={msg.img??imagePlaceHolder} alt="avatar" className="avatar" />
            <div className="message-info" >
              <div className="message-name">{msg.studentName}</div>
              <div className="message-text">{msg.message.substring(0,50) + '...'}</div>
              {msg.status ? (
                <>
                <span className="message-status">{msg.status?'New':null}</span>
                <span className="message-time">{timeAgo(msg.submissionDate)}</span>
                </>
              ) : (
                <span className="message-time">{timeAgo(msg.submissionDate)}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-btn" onClick={ViewAllMessages}>View All Messages</button>

      <div className="quick-actions">
        <h4>Quick Actions</h4>
        <button className="action-btn create" onClick={CreateNewCourse}>
          <span className="icon">➕</span> Create New Course
        </button>
        <button className="action-btn export">
          <span className="icon">⬇️</span> Export Student List
        </button>
        <button className="action-btn view">
          <span className="icon">📊</span> View Reports
        </button>
      </div>
    </div>
  );
};

export default MessagesPanel;
