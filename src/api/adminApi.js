import api from "./axios";

export const loginAdmin = async (username, password) => {
  const res = await api.post("/admin/login", { username, password });
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