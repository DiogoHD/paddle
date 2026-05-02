import { Calendar, Clock, MapPin, Users, X, Eye } from 'lucide-react';

const MatchDetailsModal = ({ match, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header with Background Accent */}
        <div className="bg-gradient-to-r from-[#009ee3] to-blue-600 px-6 py-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold">Detalhes da Partida</h2>
          <p className="text-blue-100 text-sm mt-1">Informações gerais e jogadores</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Main Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Field/Court */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="bg-blue-100 p-2 rounded-lg text-[#009ee3]">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Campo</p>
                <p className="text-sm font-semibold text-gray-800">Campo 1</p>
              </div>
            </div>

            {/* Visibility */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="bg-blue-100 p-2 rounded-lg text-[#009ee3]">
                <Eye size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Visibilidade</p>
                <p className="text-sm font-semibold text-gray-800 capitalize">Público</p>
              </div>
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="flex items-center justify-between p-4 bg-[#061237] rounded-2xl text-white">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-blue-400" />
              <span className="text-sm font-medium">Sáb., 01/06/2024</span>
            </div>
            <div className="flex items-center gap-3 border-l border-white/20 pl-4">
              <Clock size={20} className="text-blue-400" />
              <span className="text-sm font-medium">18:00 — 19:00</span>
            </div>
          </div>

          {/* Players Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users size={18} className="text-gray-400" />
              <h3 className="font-bold text-gray-700">Jogadores Confirmados</h3>
            </div>
            
            {/* 2x2 Player Grid */}
            <div className="grid grid-cols-2 gap-3">
              {['João', 'Maria', 'Joana', 'Carlos'].map((player, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-white border border-gray-200 rounded-xl shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-[#009ee3] flex items-center justify-center text-white text-xs font-bold">
                    {player.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{player}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={onClose}
            className="w-full py-4 bg-[#009ee3] hover:bg-blue-600 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98]"
          >
            Fechar Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};