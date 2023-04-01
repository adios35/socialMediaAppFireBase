import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../api/firebase";
import { Navigate } from "react-router-dom";
interface IAuthContext {
  user: User | null;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(
    //@ts-ignore
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
      localStorage.setItem("user", JSON.stringify(current));
    });
    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

// const { user } = useAuth();
