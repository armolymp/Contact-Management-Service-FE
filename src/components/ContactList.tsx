import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getContacts, deleteContact } from "../api/contactApi";
import { Edit, Trash, Eye } from "lucide-react";
import EditUserModal from "./Modals/EditUserModal";
import ViewUserModal from "./Modals/ViewUserModal";
import ConfirmationModal from "./Modals/ConfirmationModal"

const ContactList: React.FC = () => {
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const { data: contacts, isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const openEditModal = (contact: any) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const openViewModal = (contact: any) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (contact: any) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedContact(null);
  };

  const handleDeleteContact = () => {
    if (selectedContact) {
      deleteMutation.mutate(selectedContact.id);
      closeDeleteModal();
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error instanceof Error)
    return <p className="text-center text-red-500">Error fetching contacts: {error.message}</p>;

  return (
    <div className="p-4">
      {/* Table Container */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 font-bold">First Name</th>
              {/* Hidden on small screens */}
              <th className="text-left px-4 py-2 font-bold hidden md:table-cell">
                Last Name
              </th>
              <th className="text-left px-4 py-2 font-bold hidden md:table-cell">
                Email
              </th>
              <th className="text-center px-4 py-2 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((contact: any) => (
              <tr key={contact.id} className="hover:bg-gray-50 text-sm md:text-base">
                <td className="px-4 py-2">{contact.firstName}</td>
                {/* Hidden on small screens */}
                <td className="px-4 py-2 hidden md:table-cell">{contact.lastName}</td>
                <td className="px-4 py-2 hidden md:table-cell">{contact.email}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-center space-x-2">
                    {/* View button */}
                    <button
                      onClick={() => openViewModal(contact)}
                      className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {/* Edit button */}
                    <button
                      onClick={() => openEditModal(contact)}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={() => openDeleteModal(contact)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                      title="Delete"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View User Modal */}
      <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        contact={selectedContact}
      />

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={() => {}}
          initialValues={
            selectedContact || {
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
            }
          }
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteContact}
        title="Confirm Delete"
        message={`Are you sure you want to delete the user "${selectedContact?.firstName} ${selectedContact?.lastName}"?`}
      />
    </div>
  );
};

export default ContactList;
