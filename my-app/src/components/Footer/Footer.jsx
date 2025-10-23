import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Add your footer content here */}
        <p className="footer-text">
          © {new Date().getFullYear()} Bow Course. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
