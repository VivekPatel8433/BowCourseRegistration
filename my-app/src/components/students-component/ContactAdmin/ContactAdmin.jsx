import React, { useState } from "react";

const ContactAdmin = ({ sendMessage }) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleSend = (e) => {
    e.preventDefault();

    if (!email.trim() || !subject.trim() || !message.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    // Send message to App state
    sendMessage({
      from: email,
      subject,
      message,
      file,
    });

    alert("Message sent successfully!");

    // Clear form
    setEmail("");
    setSubject("");
    setMessage("");
    setFile(null);
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-blue-50 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Contact Admin</h3>
      
      <form onSubmit={handleSend} className="flex flex-col gap-5">
        <label className="flex flex-col font-semibold text-gray-700">
          Your Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </label>

        <label className="flex flex-col font-semibold text-gray-700">
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            required
            className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </label>

        <label className="flex flex-col font-semibold text-gray-700">
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            required
            className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-24"
          />
        </label>

        <label className="flex flex-col font-semibold text-gray-700">
          Attachment (optional):
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-1"
          />
        </label>

        <button 
          type="submit"
          className="self-center px-8 py-3 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactAdmin;