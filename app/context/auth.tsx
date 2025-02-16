"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginInput } from "@/types/auth";
import { Jira } from "@/helper/jira";

interface AuthContextType {
  user: string | null;
  login: (params: LoginInput) => {
    internalProjectError: boolean;
    externalProjectError: boolean;
  };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (params: LoginInput) => {
    // if (email === "admin@example.com" && password === "password") {
    //   localStorage.setItem("user", email);
    //   setUser(email);
    //   router.push("/dashboard");
    //   return true;
    // }
    const internalJira = new Jira(
      params.internalDomain,
      params.internalProject,
      params.email,
      params.token,
    );
    const project = await internalJira.getProject();
    console.log(">>>>> project", project);
    return {
      internalProjectError: false,
      externalProjectError: false,
    };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
