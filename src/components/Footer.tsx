import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-2">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo on the left */}
        <img
          src="/limark.png"
          alt="LiMark Logo"
          className="w-20 h-8"
        />

        {/* Rights reserved text on the right */}
        <p className="text-sm text-right">
          &copy; {new Date().getFullYear()} LiMark. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
