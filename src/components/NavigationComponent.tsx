import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-extrabold tracking-wide">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
            Contact<span className="text-white"> Hub</span>
          </span>
        </h1>

        <button
          className="text-white block md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <div className="hidden md:flex gap-8">
          <Link
            to="/"
            className="text-white font-medium hover:text-blue-400 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/add-user"
            className="text-white font-medium hover:text-blue-400 transition-all duration-300"
          >
            Add User
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mt-4 md:hidden">
          <Link
            to="/"
            className="block text-white hover:text-blue-400 transition-all duration-300 p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/add-user"
            className="block text-white hover:text-blue-400 transition-all duration-300 p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Add User
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
