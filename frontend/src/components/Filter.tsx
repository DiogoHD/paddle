import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import { PopUp } from '@/components/Popups';
import { DropdownFilter } from '@/components/Dropdown';
import { Controller } from "react-hook-form";




export default function FilterPopUp({
  control,
  reset
}: {
  control: any;
  reset: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const matchTypeOptions = ["SINGLE", "TEAM"];
  const accessOptions = ["PRIVATE", "PUBLIC"];

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
            <Controller
              name="matchType"
              control={control}
              render={({ field }) => (
                <DropdownFilter
                  title="Tipo de Partida"
                  content={matchTypeOptions}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="access"
              control={control}
              render={({ field }) => (
                <DropdownFilter
                  title="Acesso"
                  content={accessOptions}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={
                () => {
                reset();
                setIsOpen(false);
              }}
              className="flex-1 bg-gray-300 text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
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