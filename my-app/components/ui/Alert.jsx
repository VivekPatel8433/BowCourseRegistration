import React from "react";

export default function Alert({ children, type = "info", className = "" }) {
  const base = "p-3 rounded shadow-card";

  const types = {
    info: "bg-primary text-white",
    success: "bg-accent text-white",
    warning: "bg-yellow-500 text-white",
    danger: "bg-danger text-white",
  };

  return (
    <div className={`${base} ${types[type]} ${className}`}>
      {children}
    </div>
  );
}
