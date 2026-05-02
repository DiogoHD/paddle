import { MatchHeader } from "@/components/headers";
import { MatchCard } from "@/components/cards";

const group1 = [
  {
    name: "João",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
    {
    name: "Maria",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    name: "Joana",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    name: "Carlos",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
]

const group2 = [
  {
    name: "João",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  null,
  null,
  {
    name: "Carlos",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
]

const matches = [
  {
    date: "2024-06-01",
    start: "18:00",
    end: "19:00",
    visibility: "public",
    pitch: 1,
    people: group1
  },
  {
    date: "2024-06-01",
    start: "19:00",
    end: "20:00",
    visibility: "private",
    pitch: 2,
    people: group2
  }
]

export default function MatchPage() {
  return (
    <div className="min-h-screen w-full gap-4 flex flex-col overflow-y-auto no-scrollbar">
      <MatchHeader />
      <div className="flex flex-col items-center justify-center gap-4">
        {matches.map((match, index) => (
          <MatchCard
            match={match}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}