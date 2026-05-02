import { useState } from 'react';
import { Plus, PlusCircle, EllipsisVertical, Calendar, Clock, MapPin, UsersRound, X, Eye } from 'lucide-react';
import { MatchCard } from '@components/cards';
import { type MatchCardProps } from '@components/cards';
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
        <div className="bg-linear-to-r from-primary-blue to-blue-700 px-6 py-6 text-white">
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


/* PopUp components */
function CreateMatchPopUp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Plus
        className='size-8'
        onClick={() => setIsOpen(true)}
      />

      <PopUp 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Criar Partida"
      >
        <form className="flex flex-col gap-4 p-4">
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <label className="block text-sm text-black">Data</label>
              <input 
                type="date" 
                className="w-full border text-black border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm text-black">Início</label>
              <input 
                type="time" 
                className="w-full border text-black border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm text-black">Fim</label>
              <input 
                type="time" 
                className="w-full border text-black border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm text-black">Campo</label>
              <select className="w-full border text-black border-gray-300 rounded-lg p-2 text-center">
                <option value="public">Campo 1</option>
                <option value="private">Campo 2</option>
                <option value="private">Campo 3</option>
                <option value="private">Campo 4</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-black">Visibilidade</label>
              <select className="w-full border text-black border-gray-300 rounded-lg p-2 text-center">
                <option value="public">Pública</option>
                <option value="private">Privada</option>
              </select>
            </div> 
               
            <div>
              <label className="block text-sm text-black">Tipo de Partida</label>
              <select className="w-full border text-black border-gray-300 rounded-lg p-2 text-center">
                <option value="casual">1v1</option>
                <option value="competitive">2v2</option>
              </select>
            </div>
          </div>

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
              className="flex-1 bg-primary-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
            >
              Criar
            </button>
          </div>
        </form>
      </PopUp>
    </>
  );
}


function FiltersPopUp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <EllipsisVertical
        className='size-8'
        onClick={() => setIsOpen(true)}
      />

      <PopUp 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Filtros"
      >
        <form className="flex flex-col gap-2 p-4">
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <label className="block font-bold text-gray-700 mb-2">Data</label>
              <input 
                type="date" 
                className="w-full border text-black border-gray-200 rounded-xl shadow-sm p-2"
              />
            </div>
               
            <div>
              <label className="block font-bold text-gray-700 mb-2">Tipo de Partida</label>
              <select className="w-full border text-black border-gray-200 rounded-xl shadow-sm p-2 text-center">
                <option value="casual">1v1</option>
                <option value="competitive">2v2</option>
              </select>
            </div>
          </div>

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
              className="flex-1 bg-primary-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
            >
              Aplicar
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

function MatchDetailsPopUp({
  match
}: {
  match: MatchCardProps
}) {

  const [isOpen, setIsOpen] = useState(false);

  const date = new Date(match.date).toLocaleDateString('pt', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' });
  const dateString = date.charAt(0).toUpperCase() + date.slice(1);

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
            <PopUpEntry1 label="Campo" title={`Campo ${match.pitch}`}>
              <MapPin className="text-primary-blue" size={20} />
            </PopUpEntry1>

            {/* Visibility */}
            <PopUpEntry1 label="Visibilidade" title={match.visibility === "public" ? "Pública" : "Privada"}>
              <Eye className="text-primary-blue" size={20} />
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
              <span className="text-sm font-medium">{match.start} - {match.end}</span>
            </div>
          </div>

          {/* Players Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <UsersRound size={20} className="text-gray-400" />
              <h3 className="font-bold text-gray-700">Jogadores</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {match.people.map((player, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-xl shadow-sm">
                  {player ? (
                    <div className='flex flex-row justify-between items-center gap-3'>
                      <div className="size-8 rounded-full bg-primary-blue flex items-center justify-center text-white text-xs font-bold">
                        {player.avatarUrl ? (
                          <img 
                            src={player.avatarUrl}
                            alt={player.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          player.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <span className="text-md font-medium text-gray-700">
                        {player.name}
                      </span>
                    </div>
                  ) : (
                    <PlusCircle className="text-primary-blue" size={32} />
                  )}
                </div>
              ))}
            </div>
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
export {
  PopUp,
  CreateMatchPopUp,
  FiltersPopUp,
  MatchDetailsPopUp
}