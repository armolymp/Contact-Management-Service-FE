import React from "react";
import { useNavigate } from "react-router-dom";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleOkClick = () => {
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Success!</h2>
        <p className="text-gray-700 mb-4">Contact has been successfully added.</p>
        <div className="flex justify-end">
          <button
            onClick={handleOkClick}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
          >
            OKAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
