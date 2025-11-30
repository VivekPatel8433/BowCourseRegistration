import React from "react";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base = "px-4 py-2 rounded shadow-card font-medium transition";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    accent: "bg-accent text-white hover:bg-accent/90",
    danger: "bg-danger text-white hover:bg-danger/90",
    light: "bg-white text-black border",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
