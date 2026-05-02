import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import type { UserPublicProfile } from "@/types/accounts";
import { findUsers } from "@/api/db/accountsApi";
import useDebounce from "@/hooks/useDebounce";
import useAuth from "@/hooks/useAuth";
import { useSendFriendRequest } from "@/services/friendsService";

function BodyEntry({ person, onChange }: { person: UserPublicProfile; onChange: () => void }) {
  const { mutate: sendFriendRequest } = useSendFriendRequest();
  console.log("Rendering BodyEntry for person:", person);

  const handleSendRequest = () => {
    sendFriendRequest({ to_user: person.public_id });
  };
  
  return (
    <div className="flex flex-row border border-gray-500 rounded-full shadow-md p-2 gap-4 w-full hover:bg-gray-200 items-center hover:cursor-pointer">
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

  useEffect(()=> {
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
      <Plus
        className='size-8'
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto">
          {/* Blurred background */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        
          {/* Modal content */}
          <div className="relative min-h-80 bg-white max-w-md rounded-4xl overflow-hidden shadow-2xl w-full">
            
            {/* Search Bar */}
            <div className="p-4 border-b">
              <input 
                type="search"
                value={searchText}
                onChange={e=> setSearchText(e.target.value)}
                placeholder="Pesquisar amigos..." 
                className="w-full text-black px-4 py-2 border rounded-full"
              />
            </div>
          {/* Content */}
            <div className="p-4 flex flex-col gap-4 max-h-96 overflow-y-auto">
              {data.map(user => (
                <BodyEntry key={user.public_id} person={user} onChange={() => setIsOpen(false)} />
              ))}
            </div>
          </div>
         </div>
       )}
    </>
  );
}
