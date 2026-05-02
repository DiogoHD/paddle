import useAuth from "@hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getFriends, removeFriendship, respondFriendshipRequest, sendFriendRequest } from "@api/db/friendsApi";
import type { FriendshipRequest } from "@/types/friends";

const StaleTime = 1000 * 60 * 5; // 5 minutes
const GCTime = 1000 * 60 * 60; // 10 minutes

export const useFriends = () => {
  const { accessToken } = useAuth();

  return useQuery<FriendshipRequest[]>({
    queryKey: ["friends"],
    queryFn: () => getFriends(accessToken!),
    staleTime: StaleTime,
    gcTime: GCTime,
    enabled: !!accessToken, // Only run the query if accessToken is available
  });
}

export const useRemoveFriendship = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendshipId: string) => removeFriendship(accessToken!, friendshipId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    }
  });
}

export const useSendFriendRequest = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { to_user_id: string }) => sendFriendRequest(accessToken!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    }
  });
}

export const useRespondFriendshipRequest = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, status }: { requestId: string; status: "accepted" | "rejected" }) =>
      respondFriendshipRequest(accessToken!, requestId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    }
  });
}