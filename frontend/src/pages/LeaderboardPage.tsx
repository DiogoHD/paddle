import { Header } from "@/components/Header";
import { ArrowLeft, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

// Mock de dados para exemplo
const players = [
  { id: 1, name: "Ana Silva", total_wins: 24, rank: 1, avatar: "AS" },
  { id: 2, name: "Bruno Costa", total_wins: 21, rank: 2, avatar: "BC" },
  { id: 3, name: "Carla Souza", total_wins: 18, rank: 3, avatar: "CS" },
  { id: 4, name: "Daniel Oliveira", total_wins: 15, rank: 4, avatar: "DO" },
  { id: 5, name: "Elena Martins", total_wins: 12, rank: 5, avatar: "EM" },
];

export default function LeaderboardPage() {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-slate-50">
      <Header
        text="Leaderboard"
        leftNode={
          <Link to="/profile">
            <ArrowLeft className="size-8 text-white" />
          </Link>
        }
      />

      {/* Container Principal com Scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Podium Section (Top 3) */}
        <div className="flex items-end justify-center gap-2 pt-4 pb-2">
          {/* 2º Lugar */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center text-xl font-bold mb-2 text-slate-700">
              {players[1].avatar}
            </div>
            <div className="bg-slate-300 w-20 h-32 rounded-t-lg flex flex-col items-center justify-start p-2 shadow-sm text-slate-800">
              <span className="font-bold text-lg">2º</span>
              <span className="text-xs text-center truncate w-full font-medium">{players[1].name.split(' ')[0]}</span>
              <div className="mt-auto flex flex-col items-center leading-tight pb-1">
                <span className="font-bold text-sm">{players[1].total_wins}</span>
                <span className="text-[10px] uppercase font-semibold text-slate-600">Vitórias</span>
              </div>
            </div>
          </div>

          {/* 1º Lugar */}
          <div className="flex flex-col items-center">
            <Trophy className="text-yellow-500 size-8 mb-1 animate-bounce" />
            <div className="w-20 h-20 rounded-full bg-yellow-100 border-4 border-yellow-400 flex items-center justify-center text-2xl font-bold mb-2 text-yellow-800">
              {players[0].avatar}
            </div>
            <div className="bg-yellow-400 w-24 h-40 rounded-t-lg flex flex-col items-center justify-start p-2 shadow-md text-yellow-900">
              <span className="font-bold text-xl">1º</span>
              <span className="text-sm font-bold text-center truncate w-full">{players[0].name.split(' ')[0]}</span>
              <div className="mt-auto flex flex-col items-center leading-tight pb-2">
                <span className="font-bold text-lg">{players[0].total_wins}</span>
                <span className="text-xs uppercase font-bold text-yellow-800">Vitórias</span>
              </div>
            </div>
          </div>

          {/* 3º Lugar */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center text-xl font-bold mb-2 text-orange-800">
              {players[2].avatar}
            </div>
            <div className="bg-orange-200 w-20 h-28 rounded-t-lg flex flex-col items-center justify-start p-1.5 shadow-sm text-orange-900">
              <span className="font-bold text-lg">3º</span>
              <span className="text-xs text-center truncate w-full font-medium">{players[2].name.split(' ')[0]}</span>
              <div className="mt-auto flex flex-col items-center leading-tight pb-1">
                <span className="font-bold text-sm">{players[2].total_wins}</span>
                <span className="text-[9px] uppercase font-semibold text-orange-700">Vitórias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lista do Restante dos Jogadores */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {players.slice(3).map((player) => (
            <div 
              key={player.id} 
              className="flex items-center justify-between p-4 border-b last:border-b-0 border-slate-50"
            >
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-400 w-6 text-center">{player.rank}</span>
                <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center font-medium text-slate-700">
                  {player.avatar}
                </div>
                <span className="font-semibold text-slate-700">{player.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-indigo-600">{player.total_wins}</span>
                <span className="text-xs text-slate-400 font-medium">Vitórias</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}