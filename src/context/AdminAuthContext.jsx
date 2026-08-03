import { createContext, useContext, useEffect, useState } from "react";
import { checkAdminSession, loginAdmin, logoutAdmin } from "../api/adminApi";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const data = await checkAdminSession();
      setAdmin(data.admin);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email, password) => {
    const data = await loginAdmin(email, password);
    setAdmin(data.admin);
    return data;
  };

  const logout = async () => {
    await logoutAdmin();
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, loading, isAuthenticated: !!admin, login, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);