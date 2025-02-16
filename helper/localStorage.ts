import { LoginInput } from "@/types/auth";
import { LocalJiraData } from "@/types/common";

export const saveLoginInfo = (params: LoginInput): LocalJiraData => {
  const data = {
    internal: {
      domain: params.internalDomain,
      project: params.internalProject,
      email: params.email,
      token: params.token,
    },
    enternal: {
      domain: params.externalDomain,
      project: params.externalProject,
      email: params.email,
      token: params.token,
    },
  };
  localStorage.setItem("loginData", JSON.stringify(data));

  return data;
};

export const removeLoginInfo = () => {
  localStorage.removeItem("loginData");
};

export const getLoginInfo = (): LocalJiraData | null => {
  const data = localStorage.getItem("loginData");
  if (data) {
    return JSON.parse(data);
  }

  return null;
};
