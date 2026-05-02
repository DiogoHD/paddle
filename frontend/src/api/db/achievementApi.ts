import { apiRequest } from "@api/helpers/api";
import type { Achievement } from "@appTypes/achievements";

export const getAchievements = async (token: string): Promise<Achievement[]> => {
  const res = await apiRequest<Achievement[]>({
    method: "GET",
    path: "gamification/achievements/",
    token,
  });

  if (!res.success || !res.data) {
    throw new Error("Failed to fetch achievements");
  }

  return res.data;
}