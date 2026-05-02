import useAuth from "@hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getUserProfile, getUserPublicProfile, updateUserProfile } from "@api/db/accountsApi";

const StaleTime = 1000 * 60 * 5; // 5 minutes
const GCTime = 1000 * 60 * 60; // 10 minutes

export const useUserProfile = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(accessToken!),
    staleTime: StaleTime,
    gcTime: GCTime,
    enabled: !!accessToken, // Only run the query if accessToken is available
  });
}

export const useUserPublicProfile = (userId: string) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["userPublicProfile", userId],
    queryFn: () => getUserPublicProfile(accessToken!, userId),
    staleTime: StaleTime,
    gcTime: GCTime,
    enabled: !!accessToken, // Only run the query if accessToken is available
  });
}

export const useUpdateUserProfile = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name?: string; image?: File }) =>
      updateUserProfile(accessToken!, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    }
  });
};