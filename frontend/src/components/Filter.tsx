import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import { PopUp } from '@/components/Popups';
import Dropdown from '@/components/Dropdown';

export default function FilterPopUp() {
  const [isOpen, setIsOpen] = useState(false);

  const matchTypeOptions = [
    { value: '1v1', label: '1v1' },
    { value: '2v2', label: '2v2' },
  ];
  const [selectedMatchType, setSelectedMatchType] = useState(matchTypeOptions[0]);

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
              <label className="block text-sm text-black">Data</label>
              <input 
                type="date" 
                className="w-full border text-black border-gray-300 rounded-lg p-2"
              />
            </div>
               
            <Dropdown
              label="Tipo de Partida"
              options={matchTypeOptions}
              selected={selectedMatchType}
              onSelect={setSelectedMatchType}
            />
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