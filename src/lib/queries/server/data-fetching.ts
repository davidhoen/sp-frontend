import serverSideRequestsManager from "@/lib/auth/server-side-requests-manager";
import { ApiResponse, ApiResponseGet, ApiResponsePaginated } from "@/types/auth";

export const getData = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await serverSideRequestsManager.handleRequest<ApiResponseGet<T>>({
    url,
    method: "GET",
  });

  if (!response.success) {
    console.error("Error in getData", response);
    return { success: false, result: response.result.data || response.result as T };
  }

  return { success: true, result: response.result.data || response.result as T };
};

export const getPaginatedData = async <T>(url: string): Promise<ApiResponse<ApiResponsePaginated<T>>> => {
  const response = await serverSideRequestsManager.handleRequest<ApiResponsePaginated<T>>({
    url,
    method: "GET",
  });

  if (!response.success) {
    return response as ApiResponse<ApiResponsePaginated<T>>;
  }

  return { success: true, result: response.result };
};