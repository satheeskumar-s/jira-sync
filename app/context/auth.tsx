"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginInput } from "@/types/auth";
import { ApiResponse, LocalJiraData } from "@/types/common";
import {
  getLoginInfo,
  removeLoginInfo,
  saveLoginInfo,
} from "@/helper/localStorage";

interface AuthContextType {
  user: LocalJiraData | null;
  login: (params: LoginInput) => Promise<{
    internalProjectError?: boolean;
    externalProjectError?: boolean;
  }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LocalJiraData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = getLoginInfo();
    if (storedUser) setUser(storedUser);
    else setUser(null);
  }, []);

  const login = async (params: LoginInput) => {
    const promise1 = await fetch("/api/jira/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        params: {
          domain: params.internalDomain,
          project: params.internalProject,
          email: params.email,
          token: params.token,
        },
      }),
    });

    const promise2 = await fetch("/api/jira/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        params: {
          domain: params.externalDomain,
          project: params.externalProject,
          email: params.email,
          token: params.token,
        },
      }),
    });

    const [internalJira, externalJira] = await Promise.all([
      promise1,
      promise2,
    ]);

    const internalJiraData: ApiResponse = await internalJira.json();
    const externalJiraData: ApiResponse = await externalJira.json();

    const internalProjectError = !!internalJiraData.error;
    const externalProjectError = !!externalJiraData.error;

    if (!internalProjectError && !externalProjectError) {
      const data = saveLoginInfo(params);
      setUser(data);
      router.push("/dashboard");
      return {};
    }
    return {
      internalProjectError,
      externalProjectError,
    };
  };

  const logout = () => {
    removeLoginInfo();
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
