import { createContext, useEffect, useState } from "react";
import api from "../pages/services/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("userdata")) || null);

  const login = async (inputs) => {
    const response = await api.post("/auth/login", inputs);

    setCurrentUser(response.data);

    return response;
  };

  const register = async (inputs) => {
    const response = await api.post("/auth/register", inputs);

    return response;
  };

  const me = async () => {
    const token = currentUser.token;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.get("/auth/me", { headers });

    return response;
  };

  const logout = async () => {
    const token = currentUser.token;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.delete("/auth/logout", { headers });
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(currentUser));
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, login, register, me, logout }}>{children}</AuthContext.Provider>;
};
