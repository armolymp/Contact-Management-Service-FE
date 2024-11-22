import React from "react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-red-500 text-center">Error</h2>
        <p className="text-gray-700 mb-6 text-center">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
