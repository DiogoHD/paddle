import useAuth from "@hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getFriends, removeFriend } from "@api/db/friendsApi";
import type { Friend } from "@/types/friends";

const StaleTime = 1000 * 60 * 5; // 5 minutes
const GCTime = 1000 * 60 * 60; // 10 minutes

export const useFriends = () => {
  const { accessToken } = useAuth();

  return useQuery<Friend[]>({
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