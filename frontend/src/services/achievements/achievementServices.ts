import useAuth from "@hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

import { getAchievements } from "@api/db/achievements/achievementApi";
import type { Achievement } from "@/types/achievements";

const StaleTime = 1000 * 60 * 5; // 5 minutes

export const useAchievements = () => {
  const { accessToken } = useAuth();

  return useQuery<Achievement[]>({
    queryKey: ["achievements"],
    queryFn: () => getAchievements(accessToken!),
    staleTime: StaleTime,
    enabled: !!accessToken, // Only run the query if accessToken is available
  });
};