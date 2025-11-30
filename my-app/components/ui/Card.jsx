import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-900 p-4 rounded shadow-card ${className}`}>
      {children}
    </div>
  );
}
