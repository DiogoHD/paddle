export type Visibility = "public" | "private";

export interface MatchPlayer {
  public_id: string;
  img_src: string;
  user: string;
  user_name: string;
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