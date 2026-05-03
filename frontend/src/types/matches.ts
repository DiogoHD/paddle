import type { UserPublicProfile } from "./accounts";

export type Visibility = "public" | "private";

export interface MatchPlayer {
  public_id: string;
  user: UserPublicProfile;
  team: "A" | "B";
}

export interface Match {
  public_id: string;
  created_by: UserPublicProfile;
  match_type: "SINGLE" | "TEAM";
  field: string;
  start_time: string;
  end_time: string;
  is_private: boolean;
  winner_team: "A" | "B" | null;
  players: MatchPlayer[];
}

export interface CreateMatchPayload {
  match_type: "SINGLE" | "TEAM";
  start_time: string;
  end_time?: string;
  is_private: boolean;
}

export interface CreateMatchPlayer {
  user_id: string;
  team: "A" | "B";
}