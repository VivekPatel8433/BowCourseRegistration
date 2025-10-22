// src/pages/Contact.jsx
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("⚠️ Please fill out all fields before submitting.");
      return;
    }

    // Mock save to localStorage for demo
    const messages = JSON.parse(localStorage.getItem("contactPortalMsgs")) || [];
    messages.push({ ...formData, date: new Date().toLocaleString() });
    localStorage.setItem("contactPortalMsgs", JSON.stringify(messages));

    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          📬 Contact Us
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                rows="5"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
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
          <div className="text-center text-green-700">
            <h3 className="text-2xl font-semibold mb-2">✅ Message Sent!</h3>
            <p>
              Thank you for contacting us. We’ll get back to you as soon as
              possible.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-blue-600 underline hover:text-blue-700"
            >
              Send another message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
