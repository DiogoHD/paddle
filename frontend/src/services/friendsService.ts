import useAuth from "@hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getFriends, removeFriend, sendFriendRequest } from "@api/db/friendsApi";
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

export const useRemoveFriend = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: string) => removeFriend(accessToken!, friendId),
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