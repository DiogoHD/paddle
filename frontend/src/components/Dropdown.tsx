import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function Dropdown({
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



interface DropdownFilterProps {
  title: string;
  content: string[];
  value?: string;
  className?: string;
  onChange: (val: string) => void;
}

function DropdownFilter({
  title,
  content,
  value,
  onChange,
}: DropdownFilterProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value || "");

  const handleSelect = (item: string) => {
    // If clicking the same item, clear it, otherwise set it
    const newValue = value === item ? "" : item;
    onChange(newValue);
    setOpen(false);
    setSelected(newValue);
  };

  return (
    <div
      className="relative w-full"
    >
      <label className="block text-sm text-black">{title}</label>
      <button
        type="button"
        className="w-full border text-black border-gray-300 rounded-lg p-2 text-center flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <span>{selected || title}</span>
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-10 text-md text-black w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {content.map((item, index) => (
            <div
              key={index}
              className="p-2 text-center hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export {
  Dropdown,
  DropdownFilter
}