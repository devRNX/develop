import React from "react";

const Footer = () => {
  return (
    <footer
      className="fixed-bottom"
      style={{
        backgroundColor: "#d4f5bb",
        color: "#1A5D1A",
      }}
    >
      <div className="container py-3">
        <div className="text-center">
          <p className="mb-0">&copy; 2024 relynrelax. All rights reserved.</p>

          <p className="mb-0">
            Contact us: helpdesk.relynrelax@gmail.com | Phone: +91 9395783957
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
