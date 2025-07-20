import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check for user data in localStorage (not JWT token)
  const storedUser = localStorage.getItem("ChatApp");
  const initialUserState = storedUser ? JSON.parse(storedUser) : null;

  const [authUser, setAuthUser] = useState(initialUserState);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);