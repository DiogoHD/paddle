import axios, { type Method } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/';

const objectToFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      formData.append(key, obj[key] instanceof Blob ? obj[key] : String(obj[key]));
  }
  }
  return formData;
};

// Request argument types
export interface ApiRequestArgs {
  method?: Method;
  path: string;
  data?: Record<string, any> | null;
  isMultipart?: boolean;
  token?: string;
}

// Standard API response type
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: any;
  status?: number;
}

export const apiRequest = async <T = any>({
  method = "GET",
  path,
  data = null,
  isMultipart = false,
  token,
}: ApiRequestArgs): Promise<ApiResponse<T>> => {
  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (!isMultipart) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await axios({
      method,
      url: `${BASE_URL}${path}`,
      headers,
      data: data
        ? isMultipart
          ? objectToFormData(data)
          : data // axios handles JSON serialization automatically
        : undefined,
    });

    return { success: true, data: response.data, status: response.status };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data || "Unknown error",
      status: error.response?.status || 500,
    };
  }
};