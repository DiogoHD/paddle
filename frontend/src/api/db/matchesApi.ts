import { apiRequest } from "@api/helpers/api";
import type { Match, MatchPlayer } from "@appTypes/matches";

export const getMatches = async (token: string): Promise<Match[]> => {
  const res = await apiRequest<Match[]>({
    method: "GET",
    path: "matches/",
    token
  });

  if (!res.success || !res.data) {
    throw new Error("Failed to fetch matches");
  }

  return res.data;
}

export const createMatch = async (token: string, data: Omit<Match, "public_id" | "created_by" | "created_by_name">): Promise<Match> => {
  const res = await apiRequest({
    method: "POST",
    path: "matches/create/",
    token,
    data
  });

  if (!res.success || !res.data) {
    throw new Error("Failed to create match");
  }

  return res.data;
}

export const getMatchDetails = async (token: string, matchId: string): Promise<Match> => {
  const res = await apiRequest<Match>({
    method: "GET",
    path: `matches/${matchId}/`,
    token
  });

  if (!res.success || !res.data) {
    throw new Error("Failed to fetch match details");
  }

  return res.data;
}

export const joinMatch = async (token: string, matchId: string): Promise<MatchPlayer> => {
  const res = await apiRequest({
    method: "POST",
    path: `matches/join/${matchId}/`,
    token
  });

  if (!res.success || !res.data) {
    throw new Error("Failed to join match");
  }

  return res.data;
}

export const leaveMatch = async (token: string, matchId: string): Promise<void> => {
  const res = await apiRequest({
    method: "POST",
    path: `matches/${matchId}/leave/`,
    token
  });

  if (!res.success) {
    throw new Error("Failed to leave match");
  }
}

export const getUserMatches = async (token: string): Promise<Match[]> => {
  const res = await apiRequest<Match[]>({
    method: "GET",
    path: "matches/me/",
    token
  });

  if (!res.success || !res.data) {
    throw new Error("Failed to fetch user matches");
  }

  return res.data;
}

export const getUserMatchHistory = async (token: string): Promise<Match[]> => {
  const res = await apiRequest<Match[]>({
    method: "GET",
    path: "matches/me/history/",
    token
    });

  if (!res.success || !res.data) {
    throw new Error("Failed to fetch user match history");
  }

  return res.data;
}