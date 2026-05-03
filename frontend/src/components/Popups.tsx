import { useState } from 'react';
import { Plus, PlusCircle, Calendar, Clock, MapPin, UsersRound, X, DoorOpen, LogOut } from 'lucide-react';
import { MatchCard } from '@/components/MatchCard';
import type { Match, MatchPlayer } from '@/types/matches';
import { Dropdown } from '@/components/Dropdown';
import { useCreateMatch, useJoinMatch, useLeaveMatch } from '@services/matchesService';
import { useUserProfile } from '@/services/accountsService';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

function PopUp({
  isOpen,
  onClose,
  title,
  children 
}: PopUpProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred background */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-white max-w-md rounded-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header with Background Accent */}
        <div className="bg-primary-blue px-6 py-6 text-white">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        {/* Content */}
        {children}

      </div>
    </div>
  );
}

function CreateMatchPopUp() {
  const [isOpen, setIsOpen] = useState(false);
  const createMatch = useCreateMatch();

  const accessibilityOptions = [
    { value: 'public', label: 'Pública' },
    { value: 'private', label: 'Privada' },
  ];
  const [selectedAccessibility, setSelectedAccessibility] = useState(accessibilityOptions[0]);

  const matchTypeOptions = [
    { value: 'SINGLE', label: '1v1' },
    { value: 'TEAM', label: '2v2' },
  ];
  const [selectedMatchType, setSelectedMatchType] = useState(matchTypeOptions[0]);

  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const start_time = new Date(`${date}T${startTime}`).toISOString();

    createMatch.mutate({
      match_type: selectedMatchType.value as 'SINGLE' | 'TEAM',
      is_private: selectedAccessibility.value === 'private',
      start_time,
    }, {
      onSuccess: () => setIsOpen(false),
    });
  };

  return (
    <>
      <Plus className='size-8' onClick={() => setIsOpen(true)} />

      <PopUp isOpen={isOpen} onClose={() => setIsOpen(false)} title="Criar Partida">
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className="block text-sm text-black">Data</label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full border text-black border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm text-black">Início</label>
              <input
                type="time"
                required
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full border text-black border-gray-300 rounded-lg p-2"
              />
            </div>

            <Dropdown
              label="Acessibilidade"
              options={accessibilityOptions}
              selected={selectedAccessibility}
              onSelect={setSelectedAccessibility}
            />

            <Dropdown
              label="Tipo de Partida"
              options={matchTypeOptions}
              selected={selectedMatchType}
              onSelect={setSelectedMatchType}
            />
          </div>

          {createMatch.isError && (
            <p className="text-red-500 text-sm">Erro ao criar partida. Tenta novamente.</p>
          )}

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-gray-300 text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createMatch.isPending}
              className="flex-1 bg-primary-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
            >
              {createMatch.isPending ? 'A criar...' : 'Criar'}
            </button>
          </div>
        </form>
      </PopUp>
    </>
  );
}

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

function JoinSlot({ matchId, access, onError }: { matchId: string, access: "public" | "private", onError: (msg: string) => void }) {
  const { mutate: joinMatch, isPending } = useJoinMatch(matchId);

  return (
    <button 
      onClick={() => joinMatch(undefined, {
        onError: (error: any) => {
          const msg = error?.response?.data?.detail || "Não foi possível entrar na partida."
          onError(msg)
        }
      })}
      disabled={isPending}
      className='flex flex-row justify-between items-center gap-3 hover:cursor-pointer disabled:opacity-50'
    >
      <PlusCircle className="text-primary-blue" size={32} />
      <p className="text-md font-medium text-gray-700">
        {isPending ? "A entrar..." : access === "public" ? "Entrar" : "Pedir para entrar"}
      </p>
    </button>
  );
}

function ListPlayers({
  matchId,
  access,
  team,
  onError
}: {
  matchId: string,
  team: (MatchPlayer|null)[],
  access: "public" | "private"
  onError: (msg: string) => void
}) {
  return (
    <div className={`grid ${team.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
      {team.map((player, index) => (
        <div key={index} className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-xl shadow-sm">
          {player ? (
            <div className='flex flex-row justify-between items-center gap-3'>
              <div className="size-8 rounded-full bg-primary-blue flex items-center justify-center text-white text-xs font-bold">
                {player.user.image ? (
                  <img 
                    src={player.user.image}
                    alt={player.user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  player.user.name.charAt(0).toUpperCase()
                )}
              </div>
              <span className="text-md font-medium text-gray-700">
                {player.user.name}
              </span>
            </div>
          ) : (
            <JoinSlot matchId={matchId} access={access} onError={onError} />
          )}
        </div>
      ))}
    </div>
  );
}

function MatchDetailsPopUp({
  match
}: {
  match: Match
}) {

  const [isOpen, setIsOpen] = useState(false);
  const [joinError, setJoinError] = useState<string|null>(null);
  const { mutate: leaveMatch, isPending: isLeaving } = useLeaveMatch(match.public_id);
  
  const { data: userProfile } = useUserProfile();
  const isInMatch = match.players.some(p => p.user.public_id === userProfile?.public_id);
  
  const maxPerTeam = match.match_type === "SINGLE" ? 1 : 2;
  const midIndex = Math.ceil(match.players.length / 2);
  const team1Raw = match.players.slice(0, midIndex);
  const team2Raw = match.players.slice(midIndex);
  const team1 = [...team1Raw, ...Array(maxPerTeam - team1Raw.length).fill(null)];
  const team2 = [...team2Raw, ...Array(maxPerTeam - team2Raw.length).fill(null)];

  const date = new Date(match.start_time).toLocaleDateString('pt', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' });
  const dateString = date.charAt(0).toUpperCase() + date.slice(1);
  const startHour = new Date(match.start_time).toLocaleTimeString('pt', { hour: '2-digit', minute: '2-digit' });
  const endHour = new Date(match.end_time).toLocaleTimeString('pt', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <MatchCard match={match} dateString={dateString} onClick={() => setIsOpen(true)} />

      <PopUp isOpen={isOpen} onClose={() => setIsOpen(false)} title="Detalhes da Partida">
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
            <ListPlayers matchId={match.public_id} team={team1} access={match.is_private ? "private" : "public"} onError={setJoinError} />
            <hr className="w-64 h-1 bg-primary-blue border-0 rounded-sm" />
            <ListPlayers matchId={match.public_id} team={team2} access={match.is_private ? "private" : "public"} onError={setJoinError} />
          </div>

          {joinError && (
            <p className="text-red-500 text-sm text-center mt-4">{joinError}</p>
          )}

          {isInMatch && (
            <button 
              onClick={() => leaveMatch()}
              disabled={isLeaving}
              className="w-full bg-primary-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 hover:cursor-pointer"
            >
              <LogOut className="size-5 inline-block mr-2" />
              {isLeaving ? "A sair..." : "Sair da Partida"}
            </button>
          )}

        </div>
      </PopUp>
    </>
  );
}

export {
  PopUp,
  CreateMatchPopUp,
  MatchDetailsPopUp
}