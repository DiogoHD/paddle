import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Dropdown({
  options,
  selected,
  onSelect,
  label
}: {
  options: { value: string, label: string }[],
  selected: { value: string, label: string },
  onSelect: (option: { value: string, label: string }) => void,
  label: string
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: { value: string, label: string }) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm text-black">{label}</label>
      <button
        type="button"
        className="w-full border text-black border-gray-300 rounded-lg p-2 text-center flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected.label}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 text-black w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {options.map(option => (
            <div
              key={option.value}
              className="p-2 text-center hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}