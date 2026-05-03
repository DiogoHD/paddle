import { PopUp } from '@components/Popups';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from "@/hooks/useAuth";

function DeletePopUp({
  description,
  onRemove
}: {
    description: string;
    onRemove: () => void;
}) {

  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Trash2
        className='text-red-500 hover:cursor-pointer'
        size= {20}
        onClick={() => setIsOpen(true)}
      />

      <PopUp 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Eliminar Amigo"
      >
        <div className="flex flex-col gap-2 p-4">
          <p className="text-lg font-bold text-gray-700">
            {description}
          </p>
          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-gray-300 text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={onRemove}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>       
      </PopUp>
    </>
  );
}

function LogoutPopUp() {

  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await logout();
      // navigation handled by AuthContext
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-32 flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:cursor-pointer transition-colors"
      >
        Terminar Sessão
      </button>

      <PopUp 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Terminar Sessão"
      >
        <div className="flex flex-col gap-2 p-4">
          <p className="text-lg font-bold text-gray-700">
            Tem certeza que deseja terminar a sessão?
          </p>
          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-gray-300 text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={handleLogout}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600"
            >
              Terminar
            </button>
          </div>
        </div>       
      </PopUp>
    </>
  );
}

export {
  DeletePopUp,
  LogoutPopUp
}