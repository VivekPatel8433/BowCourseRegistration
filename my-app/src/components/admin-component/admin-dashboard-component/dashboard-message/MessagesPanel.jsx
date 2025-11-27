import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../../context/AdminContext";

const MessagesPanel = () => {
  const imagePlaceHolder = "https://api.dicebear.com/6.x/pixel-art/png?size=100";
  const [unread, setUnread] = useState([]);
  const [read, setRead] = useState([]);
  const navigate = useNavigate();
  const { messages = [], unreadMessages = [] } = useAdmin();

  // Populate read and unread lists
  useEffect(() => {
    setUnread(unreadMessages ?? []);
    const readMessages = messages?.filter((m) => m.status !== "unread") ?? [];
    setRead(readMessages);
  }, [messages, unreadMessages]);

  // Sorting
  const sortedUnread = [...unread].sort(
    (a, b) => new Date(a.submissionDate) - new Date(b.submissionDate)
  );
  const sortedRead = [...read].sort(
    (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
  );

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    if (weeks < 4) return `${weeks}w ago`;
    if (months < 12) return `${months}mo ago`;
    return `${years}y ago`;
  };

  // Top 3 messages logic
  const topMessages = (() => {
    const remaining = Math.max(4 - sortedUnread.length, 0);
    if (sortedUnread.length >= 4) return sortedUnread.slice(0, 4);
    return [...sortedUnread, ...sortedRead.slice(0, remaining)];
  })();

  // Navigation
  const ViewAllMessages = (id = null) => {
    navigate("/admin/messages", id ? { state: { messageId: id } } : {});
  };

  const CreateNewCourse = () => {
    navigate("/admin/create-course");
  };

  return (
    <div className="w-full h-full font-['Inter',sans-serif] bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      
      {/* Messages List */}
      <div className="flex flex-col gap-2.5 mb-4">
        {topMessages?.map((msg) => (
          <div
            key={msg._id}
            className={`flex items-center gap-2.5 bg-gray-50 rounded-xl p-2.5 transition-all duration-200 hover:bg-gray-100 cursor-pointer ${
              msg.status === "unread" 
                ? "border border-red-300 bg-red-50" 
                : ""
            }`}
            onClick={() => ViewAllMessages(msg._id)}
          >
            <img 
              src={msg.img ?? imagePlaceHolder} 
              alt="avatar" 
              className="w-10 h-10 rounded-full object-cover" 
            />
            <div className="flex flex-col flex-1">
              <div className="font-semibold text-sm text-gray-900">
                {msg.studentName}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {msg.message?.substring(0, 50) + "..."}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {msg.status === "unread" && (
                  <span className="text-xs text-red-600 font-semibold">
                    New
                  </span>
                )}
                <span className="text-xs text-gray-400">
                  {timeAgo(msg.submissionDate)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button 
        className="w-full py-2 border border-blue-500 rounded-lg bg-white text-blue-600 font-medium cursor-pointer transition-all duration-200 hover:bg-blue-50 mb-4"
        onClick={() => ViewAllMessages()}
      >
        View All Messages
      </button>

      {/* Quick Actions */}
      <div className="mt-auto">
        <h4 className="text-base font-semibold text-gray-900 mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button 
            className="w-full text-left py-2.5 px-2.5 border-none rounded-lg bg-blue-50 text-blue-600 cursor-pointer font-medium flex items-center gap-2 transition-all duration-200 hover:bg-blue-100"
            onClick={CreateNewCourse}
          >
            <span className="text-sm">➕</span> 
            <span>Create New Course</span>
          </button>
          <button className="w-full text-left py-2.5 px-2.5 border-none rounded-lg bg-gray-100 cursor-pointer font-medium flex items-center gap-2 transition-all duration-200 hover:bg-gray-200">
            <span className="text-sm">⬇️</span>
            <span>Export Student List</span>
          </button>
          <button className="w-full text-left py-2.5 px-2.5 border-none rounded-lg bg-gray-100 cursor-pointer font-medium flex items-center gap-2 transition-all duration-200 hover:bg-gray-200">
            <span className="text-sm">📊</span>
            <span>View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPanel;