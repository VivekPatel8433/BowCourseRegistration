import React, { useState } from "react";
import "./ContactAdmin.css";

const ContactAdmin = () => {
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

    // Simulate sending message to backend
    console.log("Sender Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    if (file) console.log("Attached file:", file);

    alert("Message sent successfully!");

    // Clear form
    setEmail("");
    setSubject("");
    setMessage("");
    setFile(null);
  };

  return (
    <div className="contact-admin">
      <h3>Contact Admin</h3>
      <form onSubmit={handleSend}>
        <label>
          Your Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            required
          />
        </label>

        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            required
          />
        </label>

        <label>
          Attachment (optional):
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </label>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactAdmin;
