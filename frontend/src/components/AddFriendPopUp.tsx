import { Plus, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { UserPublicProfile } from "@/types/accounts";
import { findUsers } from "@/api/db/accountsApi";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuth } from "@/hooks/useAuth";
import { useSendFriendRequest } from "@/services/friendsService";

function BodyEntry({ person, onChange }: { person: UserPublicProfile; onChange: () => void }) {
  const { mutate: sendFriendRequest } = useSendFriendRequest();
  console.log("Rendering BodyEntry for person:", person);

  const handleSendRequest = () => {
    sendFriendRequest({ to_user: person.public_id });
  };
  
  return (
    <div className="flex flex-row border border-primary-blue rounded-full shadow-md p-2 gap-4 w-full hover:bg-gray-200 items-center hover:cursor-pointer">
      {person.image ? (
        <img 
          src={person.image}
          alt={person.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-primary-blue flex items-center justify-center text-white text-lg font-bold">
          {person.name.charAt(0).toUpperCase()}
        </div>
      )}
      <p className="text-2xl text-bold text-gray-700">{person.name}</p>
      <Plus className="size-10 text-2xl text-green-500 ml-auto cursor-pointer transition-colors"
        onClick={
          (e) => {
            e.stopPropagation();
            handleSendRequest();
            onChange();
        }}/>
    </div>
  );
}

export function AddFriendPopUp() {
  const [isOpen, setIsOpen] = useState(false);
  const { accessToken } = useAuth();
  const [data, setData] = useState<UserPublicProfile[]>([]);
  const [searchText, setSearchText] = useState("");
  const debounce = useDebounce(searchText, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      if (debounce) {
        const users = await findUsers(accessToken!, debounce);
        setData(users);
      } else {
        setData([]);
      }
    };
    fetchUsers();
  }, [debounce, accessToken]);
  
  return (
    <>
      <Plus className='size-8 cursor-pointer' onClick={() => setIsOpen(true)} />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pb-20">
          {/* Fundo com Blur */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        
          {/* 
              MODAL CONTENT 
              - max-h-[85vh]: Limita a altura a 85% do ecrã.
              - flex flex-col: Essencial para o scroll interno funcionar.
          */}
          <div className="relative bg-white w-full max-w-md max-h-[70vh] flex flex-col rounded-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Header: shrink-0 impede que ele seja "esmagado" */}
            <div className="bg-primary-blue px-6 py-6 text-white shrink-0">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold">Adicionar Amigo</h2>
            </div>

            {/* Search Bar: shrink-0 também aqui para ficar sempre visível */}
            <div className="p-4 bg-gray-50/50 shrink-0 border-b border-gray-100">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-blue transition-colors">
                  <Search size={20} />
                </div>
                <input 
                  type="search"
                  autoFocus
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  placeholder="Nome do jogador..." 
                  className="w-full bg-white text-black pl-12 pr-4 py-3 border-2 border-gray-100 rounded-4xl focus:border-primary-blue focus:outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {/* 
                LISTA DE RESULTADOS
                - flex-1: Ocupa o resto do espaço disponível.
                - overflow-y-auto: Ativa o scroll apenas aqui dentro.
            */}
            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-4">
              {data.length > 0 ? (
                data.map(user => (
                  <BodyEntry key={user.public_id} person={user} onChange={() => setIsOpen(false)} />
                ))
              ) : (
                searchText && (
                  <p className="text-center text-gray-400 py-10 font-medium italic">
                    Nenhum jogador encontrado.
                  </p>
                )
              )}
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}