import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createContact } from "../api/contactApi";
import SuccessModal from "./Modals/SuccessModal";
import ErrorModal from "./Modals/ErrorModal"; // Import the ErrorModal component

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const ContactForm: React.FC = () => {
  const queryClient = useQueryClient();
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (newContact: Contact) => createContact(newContact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setSuccessModalOpen(true);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "User already exists";
      setErrorMessage(message);
      setErrorModalOpen(true);
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
      formik.resetForm();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="container mx-auto mt-6 px-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Contact</h1>

        <div className="bg-gray-100 p-4 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">How to Add a Contact</h3>
          <ul className="list-disc pl-5">
            <li>Fill out the form with the contact's details.</li>
            <li>Make sure the first name, last name, and email are entered correctly.</li>
            <li>Click "Submit" to save the new contact to the list.</li>
            <li>Ensure all required fields are filled before submitting.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label htmlFor="firstName" className="md:w-1/4 font-medium">
              First Name
            </label>
            <div className="md:w-3/4">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border p-2 w-full rounded-md"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label htmlFor="lastName" className="md:w-1/4 font-medium">
              Last Name
            </label>
            <div className="md:w-3/4">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border p-2 w-full rounded-md"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label htmlFor="email" className="md:w-1/4 font-medium">
              Email
            </label>
            <div className="md:w-3/4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border p-2 w-full rounded-md"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label htmlFor="phoneNumber" className="md:w-1/4 font-medium">
              Phone Number
            </label>
            <div className="md:w-3/4">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border p-2 w-full rounded-md"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-300"
            disabled={formik.isSubmitting}
          >
            Add Contact
          </button>
        </div>
      </form>
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setSuccessModalOpen(false)} />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        message={errorMessage}
      />
    </>
  );
};

export default ContactForm;
