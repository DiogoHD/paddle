import { Calendar } from 'lucide-react';

function DateInput() {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="date"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                  text-black focus:ring-blue-500 focus:border-blue-500 
                  appearance-none"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}

export {
  DateInput,
}