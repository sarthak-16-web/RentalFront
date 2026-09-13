import api from "./axios";

export const getContacts = async () => {
  const res = await api.get("/contacts");
  return res.data.contacts ?? null;
};

export const updateContacts = async (data) => {
  const res = await api.put("/contacts", data);
  return res.data.contacts;
};