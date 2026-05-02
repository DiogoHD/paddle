import { apiRequest } from "@api/helpers/api";

export const getUserProfile = async (token: string) => {
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

export const updateUserProfile = async (token: string, data: Record<string, any>) => {
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

export const getUserPublicProfile = async (token: string, userId: string) => {
  const res = await apiRequest({
    method: "GET",
    path: `accounts/${userId}/`,
    token
  });

  if (!res.success || !res.data) {
    throw new Error("Failed to fetch public profile");
  }

  return res.data;
}