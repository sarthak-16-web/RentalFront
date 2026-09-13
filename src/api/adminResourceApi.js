import api from "./axios";

/* Properties */
export const getAllProperties = async () => {
  const res = await api.get("/property/get-all");
  return res.data.properties;
};
export const getPropertySchema = async () => {
  const res = await api.get("/property/schema");
  return res.data;
};
export const addProperty = async (data) => {
  const res = await api.post("/property/add", data);
  return res.data;
};
export const editProperty = async (id, data) => {
  const res = await api.put(`/property/edit/${id}`, data);
  return res.data;
};
export const deleteProperty = async (id) => {
  const res = await api.delete(`/property/delete/${id}`);
  return res.data;
};

/* Projects */
export const getAllProjects = async () => {
  const res = await api.get("/project/get-all");
  return res.data.projects;
};
export const getProjectSchema = async () => {
  const res = await api.get("/project/schema");
  return res.data;
};
export const addProject = async (data) => {
  const res = await api.post("/project/add", data);
  return res.data;
};
export const editProject = async (id, data) => {
  const res = await api.put(`/project/edit/${id}`, data);
  return res.data;
};
export const deleteProject = async (id) => {
  const res = await api.delete(`/project/delete/${id}`);
  return res.data;
};

/* Team */
export const getAllTeamMembers = async () => {
  const res = await api.get("/team/get-all");
  return res.data.members;
};
export const addTeamMember = async (data) => {
  const res = await api.post("/team/add", data);
  return res.data;
};
export const editTeamMember = async (id, data) => {
  const res = await api.put(`/team/edit/${id}`, data);
  return res.data;
};
export const deleteTeamMember = async (id) => {
  const res = await api.delete(`/team/delete/${id}`);
  return res.data;
};

/* Partners */
export const getAllPartners = async () => {
  const res = await api.get("/partner/get-all");
  return res.data.partners;
};
export const addPartner = async (data) => {
  const res = await api.post("/partner/add", data);
  return res.data;
};
export const editPartner = async (id, data) => {
  const res = await api.put(`/partner/edit/${id}`, data);
  return res.data;
};
export const deletePartner = async (id) => {
  const res = await api.delete(`/partner/delete/${id}`);
  return res.data;
};

/* Testimonials */
export const getAllTestimonials = async () => {
  const res = await api.get("/testimonial/get-all");
  return res.data.testimonials;
};
export const addTestimonial = async (data) => {
  const res = await api.post("/testimonial/add", data);
  return res.data;
};
export const editTestimonial = async (id, data) => {
  const res = await api.put(`/testimonial/edit/${id}`, data);
  return res.data;
};
export const deleteTestimonial = async (id) => {
  const res = await api.delete(`/testimonial/delete/${id}`);
  return res.data;
};