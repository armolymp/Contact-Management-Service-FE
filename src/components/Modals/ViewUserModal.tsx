import React from "react";

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: any;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({ isOpen, onClose, contact }) => {
  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Contact Details</h2>
        <p><strong>First Name:</strong> {contact.firstName}</p>
        <p><strong>Last Name:</strong> {contact.lastName}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Phone Number:</strong> {contact.phoneNumber}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
