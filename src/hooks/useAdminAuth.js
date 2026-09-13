import { useContext } from "react";
import { AdminAuthContext } from "../context/adminAuthContextObject";

export const useAdminAuth = () => useContext(AdminAuthContext);
