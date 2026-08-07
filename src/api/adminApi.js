import api from "./axios";

export const loginAdmin = async (email, password) => {
  const res = await api.post("/api/admin/login", { email, password });
  return res.data;
};

export const logoutAdmin = async () => {
  const res = await api.post("/api/admin/logout");
  return res.data;
};

export const checkAdminSession = async () => {
  const res = await api.get("/api/admin/me");
  return res.data;
};

export const refreshAccessToken = async () => {
  const res = await api.post("/api/admin/refresh");
  return res.data;
};