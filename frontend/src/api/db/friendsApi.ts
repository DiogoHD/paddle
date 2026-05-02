import { apiRequest } from "@api/helpers/api";
import type { Friend } from "@appTypes/friends";

export const getFriends = async (token: string) => {
  const res = await apiRequest<Friend[]>({
    method: "GET",
    path: "friends/",
    token
  });

  if (!res.success || !res.data) {
    throw new Error("Failed to fetch friends");
  }

  return res.data;
}

export const removeFriend = async (token: string, friendId: string) => {
  const res = await apiRequest({
    method: "DELETE",
    path: `friends/remove/${friendId}/`,
    token
  });

  if (!res.success) {
    throw new Error("Failed to remove friend");
  }

  return res.data;
}
