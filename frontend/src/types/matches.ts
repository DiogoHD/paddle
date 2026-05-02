import type { UserPublicProfile } from "./accounts";

export type Visibility = "public" | "private";

export interface MatchPlayer {
  public_id: string;
  user: UserPublicProfile;
  team: "A" | "B";
}

export interface Match {
  public_id: string;
  created_by: string;
  created_by_name: string;
  match_type: "SINGLE" | "TEAM";
  field: string;

  start_time: string;
  end_time: string;

  is_private: boolean;

  players: MatchPlayer[];
}