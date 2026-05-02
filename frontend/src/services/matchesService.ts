import useAuth from "@hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

import { getMatches, getUserMatches, getUserMatchHistory } from "@api/db/matchesApi";
import type { Match } from "@appTypes/matches";

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