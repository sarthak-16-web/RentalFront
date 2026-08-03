import api from "./axios";

export const loginAdmin = async (email, password) => {
  const res = await api.post("/admin/login", { email, password });
  return res.data;
};

export const logoutAdmin = async () => {
  const res = await api.post("/admin/logout");
  return res.data;
};

export const checkAdminSession = async () => {
  const res = await api.get("/admin/me");
  return res.data;
};

export const refreshAccessToken = async () => {
  const res = await api.post("/admin/refresh");
  return res.data;
};