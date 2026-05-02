import { apiRequest } from "@api/helpers/api";

export const getProfile = async (token: string) => {
  const res = await apiRequest({
    method: "GET",
    path: "accounts/me/",
    token
  });

  if (!res.success || !res.data) {
    throw new Error("Failed to fetch profile");
  }

  return res.data;
}

export const updateProfile = async (token: string, data: Record<string, any>) => {
  const res = await apiRequest({
    method: "PUT",
    path: "accounts/me/update/",
    token,
    data
  });

  if (!res.success || !res.data) {
    throw new Error("Failed to update profile");
  }

  return res.data;
}

export const findUsers = async (token: string, query: string) => {

  const res = await apiRequest({
    method: "GET",
    path: `accounts/filter/posts?name=${encodeURIComponent(query)}`,
    token,
  });

  if (!res.success || !res.data) {
    throw new Error("Failed to find users");
  }

  return res.data;
}
