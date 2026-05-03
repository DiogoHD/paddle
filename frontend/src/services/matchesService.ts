import useAuth from "@hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getMatches, getUserMatches, getUserMatchHistory, createMatch, joinMatch, leaveMatch } from "@api/db/matchesApi";
import type { CreateMatchPayload, Match } from "@appTypes/matches";

const StaleTime = 1000 * 60 * 5; // 5 minutes
const GCTime = 1000 * 60 * 60; // 10 minutes

export const useMatches = () => {
  const { accessToken } = useAuth();

  return useQuery<Match[]>({
    queryKey: ["matches"],
    queryFn: () => getMatches(accessToken!),
    staleTime: StaleTime,
    gcTime: GCTime,
    enabled: !!accessToken, // Only run the query if accessToken is available
  });
}

export const useUserMatches = () => {
  const { accessToken } = useAuth();

  return useQuery<Match[]>({
    queryKey: ["userMatches"],
    queryFn: () => getUserMatches(accessToken!),
    staleTime: StaleTime,
    gcTime: GCTime,
    enabled: !!accessToken, // Only run the query if accessToken is available
  });
}

export const useUserMatchHistory = () => {
  const { accessToken } = useAuth();

  return useQuery<Match[]>({
    queryKey: ["userMatchHistory"],
    queryFn: () => getUserMatchHistory(accessToken!),
    staleTime: StaleTime,
    gcTime: GCTime,
    enabled: !!accessToken, // Only run the query if accessToken is available
  });
}

export const useCreateMatch = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (matchData: CreateMatchPayload) => createMatch(accessToken!, matchData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["userMatches"] });
    }
  });
}

export const useJoinMatch = (matchId: string) => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => joinMatch(accessToken!, matchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["userMatches"] });
    }
  });
}

export const useLeaveMatch = (matchId: string) => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => leaveMatch(accessToken!, matchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["userMatches"] });
    }
  });
}