import { useState } from 'react';
import { Plus, ListFilter, X } from 'lucide-react';

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
              <label className="block text-sm text-black">Acessibilidade</label>
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
      <ListFilter
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

export {
  PopUp,
  CreateMatchPopUp,
  FiltersPopUp,
}