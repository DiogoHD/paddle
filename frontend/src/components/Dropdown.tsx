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

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const handleSelect = (item: string) => {
    // If clicking the same item, clear it, otherwise set it
    const newValue = value === item ? "" : item;
    onChange(newValue);
    setOpen(false);
  };

  const displayLabel = value ? `${title}: ${value}` : title;

  return (
    <div
      className="rounded-2xl border border-surface300 bg-white text-sm cursor-pointer"
      onClick={toggleDropdown}
    >
      <div className="px-4 py-2 flex justify-between items-center w-full hover:bg-surface100 hover:text-surface950 translate-y-[-0.093rem]">
        <span className="truncate">{displayLabel}</span>
        <ChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          } size-4 text-surface700`}
        />
      </div>
      {open && (
        <div className="w-full text-left bg-white transition-all duration-200 ease-in-out">
          <div
            className={"px-4 py-2 hover:bg-surface100 cursor-pointer"}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect("");
            }}
          >
            Todos
          </div>
          {content.map((item, index) => (
            <div
              key={index}
              className={`px-4 py-2 hover:bg-surface100 cursor-pointer ${value === item ? "font-bold text-primary800 bg-surface50" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(item);
              }}
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