import { MatchHeader } from "@/components/headers";
import { MatchPopUp } from "@/components/popups";

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

const group3 = [
  {
    name: "Mario",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  null,
]

const group4 = [
  {
    name: "Carlos",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  null,
]

const group5 = [
  {
    name: "Serra",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  null,
  null,
  null
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
  },
  {
    date: "2026-02-03",
    start: "09:00",
    end: "10:00",
    visibility: "public",
    pitch: 3,
    people: group3
  },
  {
    date: "2025-02-02",
    start: "10:00",
    end: "12:00",
    visibility: "private",
    pitch: 2,
    people: group4
  },
  {
    date: "2024-11-15",
    start: "12:00",
    end: "14:00",
    visibility: "private",
    pitch: 4,
    people: group5
  }
]

export default function MatchPage() {
  return (
    <div className="min-h-screen w-full gap-4 flex flex-col overflow-y-auto no-scrollbar">
      <MatchHeader />
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        {matches.map((match, index) => (
          <MatchPopUp
            match={match}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}