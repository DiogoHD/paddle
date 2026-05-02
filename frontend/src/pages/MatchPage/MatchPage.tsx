import { Header } from "@/components/headers";
import { CreateMatchPopUp, FiltersPopUp } from "@/components/popups/popups";
import MatchDetailsPopUp from "@/components/popups/MatchDetailsPopUp";
import type { Match } from "@/types/match";

const matches: Match[] = [
  {
    public_id: "1",
    created_by: "1",
    created_by_name: "João",
    match_type: "TEAM",
    field: "1",
    start_time: "2024-06-01T18:00:00",
    end_time: "2024-06-01T19:00:00",
    is_private: false,
    players: [
      { public_id: "1", img_src: "https://randomuser.me/api/portraits/men/1.jpg", user: "1", user_name: "João", team: "A" },
      { public_id: "2", img_src: "https://randomuser.me/api/portraits/women/1.jpg", user: "2", user_name: "Maria", team: "A" },
      { public_id: "3", img_src: "https://randomuser.me/api/portraits/men/2.jpg", user: "3", user_name: "Joana", team: "B" },
      { public_id: "4", img_src: "https://randomuser.me/api/portraits/men/3.jpg", user: "4", user_name: "Carlos", team: "B" },
    ]
  },
  // ...
]

export default function MatchPage() {
  return (
    <div className="h-full w-full gap-4 flex flex-col no-scrollbar">
      <Header text="Procurar Partida" leftNode={<CreateMatchPopUp />} rightNode={<FiltersPopUp />} />
      <div className="flex flex-col items-center justify-center gap-4 p-2">
        {matches.map((match, index) => (
          <MatchDetailsPopUp
            match={match}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}