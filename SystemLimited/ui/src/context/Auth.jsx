import React, { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "", refreshToken: "" });

useEffect(() => {
  const storedAuth = localStorage.getItem("auth");
  if (storedAuth) {
    const parsed = JSON.parse(storedAuth);
    setAuth({
      user: parsed.user || null,
      token: parsed.token || "",
    });
  }
}, []);
  
  // Load auth from localStorage on mount
  // useEffect(() => {
  //   const storedAuth = localStorage.getItem("auth");
  //   if (storedAuth) setAuth(JSON.parse(storedAuth));
  // }, []);

  // Save auth to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return <UserContext.Provider value={[auth, setAuth]}>{children}</UserContext.Provider>;
};

export const useAuth = () => useContext(UserContext);

export default AuthProvider;