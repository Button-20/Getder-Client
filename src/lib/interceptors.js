// import { Navigate } from "react-router-dom";
import { storageService } from "./storage.service";

// Check status code for 401 and 403 and redirect to login page if true
export const httpInterceptor = (res) => {
  // if (res.status === 401 || res.status === 403) {
  //   storageService.removeToken();
  //   window.location.href = "/auth/login";
  // }
  return res;
};

export const tokenInterceptor = async (options) => {
  const token = await storageService.getAccessToken();
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return options;
};
