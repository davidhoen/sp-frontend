import serverSideRequestsManager from "@/lib/auth/server-side-requests-manager";
import { ApiResponse, ApiResponseGet, ApiResponsePaginated } from "@/types/auth";

export const getData = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await serverSideRequestsManager.handleRequest<ApiResponseGet<T>>({
    url,
    method: "GET",
  });

  if (!response.success) {
    // We expect 410 status code to be returned when the resource is no longer available
    response.error?.response?.status != 410 && console.error("Error in getData", response.result);
    return { success: false, result: response.error?.response?.data || response.result as T, status: response.error?.response?.status };
  }

  return { success: true, result: response.result?.data || response.result as T, status: response.status };
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