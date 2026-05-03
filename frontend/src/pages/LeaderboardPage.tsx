import { Header } from "@/components/Header";
import { ArrowLeft, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetLeaderboard } from "@services/accountsService";
import { LoadingState, ErrorState } from "@components/States";
import type { UserPublicProfile } from "@appTypes/accounts";

const getImageUrl = (image: string | null | undefined): string => {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `http://localhost:8000${image.startsWith('/') ? '' : '/'}${image}`;
};

function PlayerAvatar({ image, name, className }: { image: string | null; name: string; className: string }) {
  const url = getImageUrl(image);
  return (
    <div className={className}>
      {url ? (
        <img src={url} alt={name} className="w-full h-full object-cover rounded-full" />
      ) : (
        name[0]
      )}
    </div>
  );
}

export default function LeaderboardPage() {
  const { data: leaderboardData, isLoading, error } = useGetLeaderboard();
  const players: UserPublicProfile[] = leaderboardData || [];

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

      {isLoading && <LoadingState message="A carregar leaderboard..." />}
      {error && <ErrorState message="Failed to fetch leaderboard" />}

      {!isLoading && !error && players.length > 0 && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="flex items-end justify-center gap-2 pt-4 pb-2">

            {/* 2º Lugar */}
            {players[1] && (
              <div className="flex flex-col items-center">
                <PlayerAvatar image={players[1].image} name={players[1].name} className="w-16 h-16 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center text-xl font-bold mb-2 text-slate-700" />
                <div className="bg-slate-300 w-20 h-32 rounded-t-lg flex flex-col items-center justify-start p-2 shadow-sm text-slate-800">
                  <span className="font-bold text-lg">2º</span>
                  <span className="text-xs text-center truncate w-full font-medium">{players[1].name.split(' ')[0]}</span>
                  <div className="mt-auto flex flex-col items-center leading-tight pb-1">
                    <span className="font-bold text-sm">{players[1].total_wins}</span>
                    <span className="text-[10px] uppercase font-semibold text-slate-600">Vitórias</span>
                  </div>
                </div>
              </div>
            )}

            {/* 1º Lugar */}
            {players[0] && (
              <div className="flex flex-col items-center">
                <Trophy className="text-yellow-500 size-8 mb-1 animate-bounce" />
                <PlayerAvatar image={players[0].image} name={players[0].name} className="w-20 h-20 rounded-full bg-yellow-100 border-4 border-yellow-400 flex items-center justify-center text-2xl font-bold mb-2 text-yellow-800" />
                <div className="bg-yellow-400 w-24 h-40 rounded-t-lg flex flex-col items-center justify-start p-2 shadow-md text-yellow-900">
                  <span className="font-bold text-xl">1º</span>
                  <span className="text-sm font-bold text-center truncate w-full">{players[0].name.split(' ')[0]}</span>
                  <div className="mt-auto flex flex-col items-center leading-tight pb-2">
                    <span className="font-bold text-lg">{players[0].total_wins}</span>
                    <span className="text-xs uppercase font-bold text-yellow-800">Vitórias</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3º Lugar */}
            {players[2] && (
              <div className="flex flex-col items-center">
                <PlayerAvatar image={players[2].image} name={players[2].name} className="w-16 h-16 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center text-xl font-bold mb-2 text-orange-800" />
                <div className="bg-orange-200 w-20 h-28 rounded-t-lg flex flex-col items-center justify-start p-1.5 shadow-sm text-orange-900">
                  <span className="font-bold text-lg">3º</span>
                  <span className="text-xs text-center truncate w-full font-medium">{players[2].name.split(' ')[0]}</span>
                  <div className="mt-auto flex flex-col items-center leading-tight pb-1">
                    <span className="font-bold text-sm">{players[2].total_wins}</span>
                    <span className="text-[9px] uppercase font-semibold text-orange-700">Vitórias</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lista do Restante */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {players.slice(3).map((player, index) => (
              <div key={player.public_id || index} className="flex items-center justify-between p-4 border-b last:border-b-0 border-slate-50">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-slate-400 w-6 text-center">{index + 4}</span>
                  <PlayerAvatar image={player.image} name={player.name} className="size-10 rounded-full bg-slate-100 flex items-center justify-center font-medium text-slate-700" />
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
      )}
    </div>
  );
}