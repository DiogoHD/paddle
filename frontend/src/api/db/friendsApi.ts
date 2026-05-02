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

export const removeFriendship = async (token: string, friendshipId: string) => {
  const res = await apiRequest({
    method: "DELETE",
    path: `friends/${friendshipId}/remove/`,
    token
  });

  if (!res.success) {
    throw new Error("Failed to remove friend");
  }

  return res.data;
}


export const sendFriendRequest = async (token: string, data: { to_user: string }) => {
  const res = await apiRequest({
    method: "POST",
    path: "friends/requests/send/",
    token,
    data,
  });

  if (!res.success) {
    throw new Error("Failed to send friend request");
  }

  return res.data;
};

export const respondFriendshipRequest = async (token: string, requestId: string, status: "accepted" | "rejected") => {
  const res = await apiRequest({
    method: "PUT",
    path: `friends/requests/${requestId}/respond/`,
    token,
    data: { status }
  });

  if (!res.success) {
    throw new Error("Failed to respond to friendship request");
  }

  return res.data;
}