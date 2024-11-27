import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { EXPIRED_SESSION_ROUTE, LOGIN_ROUTE } from ".";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json", // * Important so we don't get HTML responses
    "Content-Type": "application/json",
    "Cache-Control": "no-cache", // "Do not use cached content without validating with the server"
  }
});

// Add an interceptor to redirect to the login page if the server responds with a 401 (unauthorized)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {

    if (error.response?.status === 401) {
      if (typeof window !== "undefined" && window.location.pathname !== LOGIN_ROUTE) {
        // We're on the client side
        // It's important to check that we're not on the login page, otherwise we'll end up in an infinite loop
        // The server side redirects should be handled by a ServerSideRequestsManager class
        window.location.href = EXPIRED_SESSION_ROUTE;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;