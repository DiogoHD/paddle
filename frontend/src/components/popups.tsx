import { useState } from 'react';
import { Plus, EllipsisVertical } from 'lucide-react';
import { MatchCard } from '@components/cards';
import { type MatchCardProps } from '@components/cards';
interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

function PopUp({ isOpen, onClose, title, children }: PopUpProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-white rounded-2xl shadow-lg p-6 max-w-sm w-11/12 z-10">
        {title && (
          <h2 className="text-2xl font-bold mb-4 text-primary-blue">{title}</h2>
        )}
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
        <form className="flex flex-col gap-4">
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
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
            >
              Create
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
        <form className="flex flex-col gap-4">
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <label className="block text-sm text-black">Data</label>
              <input 
                type="date" 
                className="w-full border text-black border-gray-300 rounded-lg p-2"
              />
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
              Aplicar
            </button>
          </div>
        </form>
      </PopUp>
    </>
  );
}

function BodyEntry({
  entry
}: {
  entry: React.ReactNode;
}) {
  return (
    <div className="flex justify-between flex-row border border-primary-blue rounded-lg shadow-md p-2 gap-4 w-full hover:bg-gray-200 items-center">
      {entry}
    </div>
  );
}


function MatchPopUp({
  match
}: {
  match: MatchCardProps
}) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MatchCard
        match={match}
        onClick={() => setIsOpen(true)}
      />

      <PopUp 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Detalhes da Partida"
      >
        <div className='flex flex-col gap-2'>
          <BodyEntry
            entry={<p className="text-lg font-bold">Campo: Campo {match.pitch}</p>}
          />
          <BodyEntry
            entry={<p className="text-lg font-bold">Data: {new Date(match.date).toLocaleDateString('pt', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' })}</p>}
          />
          <BodyEntry
            entry={<p className="text-lg font-bold">Início: {match.start}</p>}
          />
          <BodyEntry
            entry={<p className="text-lg font-bold">Fim: {match.end}</p>}
          />
          <BodyEntry
            entry={<p className="text-lg font-bold">Campo: {match.pitch}</p>}
          />
          <BodyEntry
            entry={<p className="text-lg font-bold">Visibilidade: {match.visibility}</p>}
          />
          {match.people.map((person, index) => (
            person ? (
              <BodyEntry
                key={index}
                entry={<p className="text-lg font-bold">Jogador {index + 1}: {person.name}</p>}
              />
            ) : (
              <BodyEntry
                key={index}
                entry={<p className="text-lg font-bold">Jogador {index + 1}: Vaga</p>}
              />
            )
          ))}
        </div>
      </PopUp>
    </>
  );
}
export {
  PopUp,
  CreateMatchPopUp,
  FiltersPopUp,
  MatchPopUp
}