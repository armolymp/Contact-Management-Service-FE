import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/contacts";

export const getContacts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createContact = async (contact: any) => {
  const response = await axios.post(BASE_URL, contact);
  return response.data;
};

export const updateContact = async (id: number, contact: any) => {
  const response = await axios.put(`${BASE_URL}/${id}`, contact);
  return response.data;
};

export const deleteContact = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
