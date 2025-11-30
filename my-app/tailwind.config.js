/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable professional dark mode using class strategy

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./view/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Clean modern UI font
      },
      colors: {
        primary: "#2563eb",   // Blue-600
        secondary: "#4b5563", // Gray-600
        accent: "#10b981",    // Emerald-500
        danger: "#ef4444",    // Red-500
      },
      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.1)", // Nice soft professional card shadow
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
