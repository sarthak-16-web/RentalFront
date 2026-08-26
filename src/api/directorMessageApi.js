import api from "./axios";

export const getDirectorMessage = async () => {
  const res = await api.get("/director-message");
  return res.data.directorMessage ?? null;
};

export const updateDirectorMessage = async (data) => {
  const res = await api.put("/director-message", data);
  return res.data.directorMessage;
};
