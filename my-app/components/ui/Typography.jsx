import React from "react";

export function Heading({ children, className = "" }) {
  return <h1 className={`text-2xl font-bold ${className}`}>{children}</h1>;
}

export function Subheading({ children, className = "" }) {
  return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
}

export function Text({ children, className = "" }) {
  return <p className={`text-base leading-relaxed ${className}`}>{children}</p>;
}

export function Article({ children, className = "" }) {
  return <article className={`prose dark:prose-invert ${className}`}>{children}</article>;
}
