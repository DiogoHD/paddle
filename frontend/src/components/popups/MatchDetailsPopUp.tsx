import { MatchCard } from '@components/cards';
import type { Match, MatchPlayer } from '@appTypes/matches';
import { PlusCircle, Calendar, Clock, MapPin, UsersRound, DoorOpen } from 'lucide-react';
import { PopUp } from '@components/popups/popups';
import { useState } from 'react';

function PopUpEntry1({
  label,
  title,
  children
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-2xl border border-gray-100">
      {children}
      <div className="flex flex-col">
        <p className="text-sm uppercase text-gray-500 font-bold">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
      </div>
    </div>
  );
}


function ListPlayers({
  access,
  team
}: {
  team: (MatchPlayer|null)[],
  access: "public" | "private"
}) {
  return (
    <div className={`grid ${team.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
      {team.map((player, index) => (
        <div key={index} className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-xl shadow-sm">
          {player ? (
            <div className='flex flex-row justify-between items-center gap-3'>
              <div className="size-8 rounded-full bg-primary-blue flex items-center justify-center text-white text-xs font-bold">
                {player.img_src ? (
                  <img 
                    src={player.img_src}
                    alt={player.user_name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  player.user_name.charAt(0).toUpperCase()
                )}
              </div>
              <span className="text-md font-medium text-gray-700">
                {player.user_name}
              </span>
            </div>
          ) : (
            <div className='flex flex-row justify-between items-center gap-3'>
              <PlusCircle className="text-primary-blue" size={32} />
              <p className="text-md text-inline font-medium text-gray-700">
                {access === "public" ? "Entrar" : "Pedir para entrar"}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function MatchDetailsPopUp({
  match
}: {
  match: Match
}) {

  const [isOpen, setIsOpen] = useState(false);

  const midIndex = Math.ceil(match.players.length / 2);
  const team1 = match.players.slice(0, midIndex);
  const team2 = match.players.slice(midIndex);

  const date = new Date(match.start_time).toLocaleDateString('pt', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' });
  const dateString = date.charAt(0).toUpperCase() + date.slice(1);
  const startHour = new Date(match.start_time).toLocaleTimeString('pt', { hour: '2-digit', minute: '2-digit' });
  const endHour = new Date(match.end_time).toLocaleTimeString('pt', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <MatchCard
        match={match}
        dateString={dateString}
        onClick={() => setIsOpen(true)}
      />

      <PopUp 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Detalhes da Partida"
      >
        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Main Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Court */}
            <PopUpEntry1 label="Campo" title={`Campo ${match.field}`}>
              <MapPin className="text-primary-blue" size={20} />
            </PopUpEntry1>

            {/* Visibility */}
            <PopUpEntry1 label="Acesso" title={match.is_private ? "Privada" : "Pública"}>
              <DoorOpen className="text-primary-blue" size={20} />
            </PopUpEntry1>
          </div>

          {/* Date & Time Row */}
          <div className="flex items-center justify-between p-4 bg-[#061237] rounded-2xl text-white">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-blue-400" />
              <span className="text-sm font-medium">{dateString}</span>
            </div>
            <div className="flex items-center gap-3 border-l border-white/20 pl-4">
              <Clock size={20} className="text-blue-400" />
              <span className="text-sm font-medium">{startHour} - {endHour}</span>
            </div>
          </div>

          {/* Players Section */}
          <div className="flex items-center gap-2 mb-4">
            <UsersRound size={20} className="text-gray-400" />
            <h3 className="font-bold text-gray-700">Jogadores</h3>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <ListPlayers team={team1} access={match.is_private ? "private" : "public"} />
            
            <hr className="w-64 h-1 bg-primary-blue border-0 rounded-sm" />
            
            <ListPlayers team={team2} access={match.is_private ? "private" : "public"} />
          </div>

          {/* Action Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="flex-1 bg-primary-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 w-full"
          >
            Fechar Detalhes
          </button>
        </div>
      </PopUp>
    </>
  );
}