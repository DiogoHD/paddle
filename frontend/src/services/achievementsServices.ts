import useAuth from "@hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

import { getAchievements } from "@/api/db/achievementsApi";
import type { Achievement } from "@/types/achievements";

const StaleTime = 1000 * 60 * 5; // 5 minutes
const GCTime = 1000 * 60 * 60; // 10 minutes

export const useAchievements = () => {
  const { accessToken } = useAuth();

  return useQuery<Achievement[]>({
    queryKey: ["achievements"],
    queryFn: () => getAchievements(accessToken!),
    staleTime: StaleTime,
    gcTime: GCTime,
    enabled: !!accessToken,
  });
};