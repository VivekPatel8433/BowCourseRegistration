import React from "react";
import { Link } from "react-router-dom";

function Messages() {
  const messages = [
    { sender: "Professor Smith", subject: "Assignment Reminder", body: "Don’t forget to submit your project by Friday." },
    { sender: "Registrar", subject: "Class Schedule Update", body: "Database Design class will now meet on Tuesdays." },
    { sender: "Student Affairs", subject: "Campus Event", body: "Join the Student Hackathon this weekend!" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex flex-col items-center py-10">
      <h2 className="text-4xl font-bold text-purple-700 mb-6">💬 Messages</h2>
      <div className="w-3/4 md:w-2/3 lg:w-1/2 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className="bg-white shadow-md rounded-lg p-6 border border-purple-200 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-purple-800 mb-1">{msg.subject}</h3>
            <p className="text-sm text-gray-600 mb-2">From: {msg.sender}</p>
            <p className="text-gray-700">{msg.body}</p>
          </div>
        ))}
      </div>
      <Link
        to="/dashboard"
        className="mt-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg"
      >
        ⬅ Back to Dashboard
      </Link>
    </div>
  );
}

export default Messages;
