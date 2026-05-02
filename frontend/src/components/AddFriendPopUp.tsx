import { Plus } from "lucide-react";
import { useState } from "react";

function BodyEntry({
  label,
  type = "text",
  placeholder,
  value,
  onChange
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-sm text-black">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border text-black border-gray-300 rounded-lg p-2"
      />
    </div>
  );
}


export function AddFriendPopUp() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Plus
        className='size-8'
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
                type="text" 
                placeholder="Pesquisar amigos..." 
                className="w-full text-black px-4 py-2 border rounded-full"
              />
            </div>
          {/* Content */}

          </div>
        </div>
      )}
    </>
  );
}