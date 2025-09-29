import React, { useState } from "react";

function Signup({ onSignup }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    program: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password || !form.program) {
      alert("Please fill in all fields!");
      return;
    }
    onSignup(form);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <br />
        <input
          placeholder="Program (e.g., Diploma, Post-Diploma)"
          onChange={(e) => setForm({ ...form, program: e.target.value })}
        />
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
