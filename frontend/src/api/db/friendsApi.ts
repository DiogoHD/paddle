import { apiRequest } from "@api/helpers/api";
import type { FriendshipRequest } from "@appTypes/friends";

export const getFriends = async (token: string) => {
  const res = await apiRequest<FriendshipRequest[]>({
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


export const sendFriendRequest = async (token: string, data: { to_user_id: string }): Promise<FriendshipRequest> => {
  const res = await apiRequest({
    method: "POST",
    path: `friends/requests/send/`,
    token,
    data: {
      to_user_id: data.to_user_id
    }
  });

  if (!res.success || !res.data) {
    throw new Error("Failed to send friend request");
  }

  return res.data;
}