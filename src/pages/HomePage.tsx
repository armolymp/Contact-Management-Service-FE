import React from "react";
import ContactList from "../components/ContactList";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Welcome to LiMark Contact Management System!
        </h2>
        <p className="text-gray-600 mb-4">
          Manage your contacts efficiently and keep your data organized. Follow these steps to use the system:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>View all existing contacts on this page.</li>
          <li>Click on "Add User" in the navigation bar to add new contacts.</li>
          <li>Use the "Edit" button next to a contact to update their details.</li>
          <li>Click the "Delete" button to remove unwanted contacts.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          User - Contact List
        </h2>
        <ContactList />
      </div>
    </div>
  );
};

export default HomePage;
