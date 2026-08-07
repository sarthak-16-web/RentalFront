import api from "./axios";

/* Properties */
export const getAllProperties = async () => {
  const res = await api.get("/api/property/get-all");
  return res.data.properties;
};
export const addProperty = async (data) => {
  const res = await api.post("/api/property/add", data);
  return res.data;
};
export const editProperty = async (id, data) => {
  const res = await api.put(`/api/property/edit/${id}`, data);
  return res.data;
};
export const deleteProperty = async (id) => {
  const res = await api.delete(`/api/property/delete/${id}`);
  return res.data;
};

/* Projects */
export const getAllProjects = async () => {
  const res = await api.get("/api/project/get-all");
  return res.data.projects;
};
export const addProject = async (data) => {
  const res = await api.post("/api/project/add", data);
  return res.data;
};
export const editProject = async (id, data) => {
  const res = await api.put(`/api/project/edit/${id}`, data);
  return res.data;
};
export const deleteProject = async (id) => {
  const res = await api.delete(`/api/project/delete/${id}`);
  return res.data;
};

/* Testimonials */
export const getAllTestimonials = async () => {
  const res = await api.get("/api/testimonial/get-all");
  return res.data.testimonials;
};
export const addTestimonial = async (data) => {
  const res = await api.post("/api/testimonial/add", data);
  return res.data;
};
export const editTestimonial = async (id, data) => {
  const res = await api.put(`/api/testimonial/edit/${id}`, data);
  return res.data;
};
export const deleteTestimonial = async (id) => {
  const res = await api.delete(`/api/testimonial/delete/${id}`);
  return res.data;
};