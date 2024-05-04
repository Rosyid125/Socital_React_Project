import { createContext, useEffect, useState } from "react";
import api from "../pages/services/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("userdata")) || null);

  const login = async (inputs) => {
    // const res = await api.post("/login", inputs, {
    //   withCredentials: true,
    // });
    const response = await api.post("/login", inputs);
    setCurrentUser(response.data);
  };

  const logout = async () => {
    // Define your token
    const token = currentUser.token;

    // Define headers with Authorization Bearer token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await api.delete("/logout", { headers });
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(currentUser));
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>;
};
