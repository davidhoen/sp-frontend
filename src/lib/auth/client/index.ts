import axiosInstance from "@/lib/axios";
import { LoginRequest, RegisterRequest } from "@/schemas/zod";

import { UserType } from "@/types/auth";
import { z } from "zod";

export const getCsrfToken = async () => {
  await axiosInstance.get("/sanctum/csrf-cookie");
};

export const login = async (
  data: z.infer<typeof LoginRequest>
): Promise<UserType> => {
  await getCsrfToken(); // Get the CSRF token and store it in the cookies
  const response = await axiosInstance.post(
    "/login",
    data
  );

  return response.data.data;
};

export const register = async (
  data: z.infer<typeof RegisterRequest>
): Promise<UserType> => {
  await getCsrfToken();
  const response = await axiosInstance.post(
    "/register",
    data
  );

  return response.data.data;
};

export const logout = async () => {
  await getCsrfToken();
  await axiosInstance.post("/logout");
};

export const fetchUser = async () => {
  const response = await fetch("/api/user", { cache: "no-store" });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch user");
  }
};