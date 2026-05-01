import { MatchHeader } from "@/components/headers";
import { MatchCard } from "@/components/card";

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

const matches = [
  {
    time: "18:00 - 19:00",
    pitch: 1,
    people: group1
  },
  {
    time: "19:00 - 20:00",
    pitch: 2,
    people: group2
  }
]

export default function MatchPage() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <MatchHeader />
      <div className="flex flex-col items-center justify-center mt-20">
        {matches.map((match, index) => (
          <MatchCard
            key={index}
            time={match.time}
            pitch={match.pitch}
            people={match.people}
          />
        ))}
      </div>
    </div>
  );
}