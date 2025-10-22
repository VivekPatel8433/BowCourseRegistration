// src/pages/ContactAdmin.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const ContactAdmin = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    name: currentUser?.username || "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("⚠️ Please fill out all fields before submitting.");
      return;
    }

    // Save message to localStorage (for mock backend)
    const savedMessages =
      JSON.parse(localStorage.getItem("adminMessages")) || [];
    const updatedMessages = [
      ...savedMessages,
      { ...formData, date: new Date().toLocaleString() },
    ];
    localStorage.setItem("adminMessages", JSON.stringify(updatedMessages));

    setSubmitted(true);
    setFormData({
      name: currentUser?.username || "",
      email: "",
      subject: "",
      message: "",
    });

    alert("✅ Your message has been sent to the administrator!");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">📞 Contact Administrator</h2>

        {currentUser ? (
          <>
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
              >
                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Briefly describe your issue"
                    className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows="5"
                    className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div className="bg-green-50 border border-green-300 text-green-800 rounded-lg p-6 max-w-lg">
                <h3 className="text-xl font-semibold mb-2">✅ Message Sent!</h3>
                <p>
                  Thank you for reaching out. The administrator will get back to
                  you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-blue-600 underline"
                >
                  Send another message
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-600">
            Please{" "}
            <a href="/login" className="text-blue-600 underline">
              log in
            </a>{" "}
            to contact the administrator for assistance.
          </p>
        )}
      </main>
    </div>
  );
};

export default ContactAdmin;
