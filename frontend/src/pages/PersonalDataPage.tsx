import { Header } from "@/components/Header";
import { ArrowLeft, User, Mail, Calendar, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserProfile } from "@services/accountsService";
import { LoadingState, ErrorState } from "@components/States";

export default function PersonalDataPage() {
  const { data: user, isLoading, isError } = useUserProfile();

  return (
    <div className="h-full w-full gap-4 flex flex-col bg-gray-50">
      <Header 
        text="Dados Pessoais" 
        leftNode={<Link to="/profile"><ArrowLeft className="size-8 text-white" /></Link>} 
      />

      <div className="flex flex-col p-4 gap-6 h-full w-full max-w-2xl mx-auto">
        {isLoading && <LoadingState message="A carregar dados..." />}
        {isError && <ErrorState message="Erro ao carregar os dados." />}
        {user && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Secção de Info */}
            <div className="p-6 space-y-6">
              <InfoField 
                icon={<User className="text-gray-400" />} 
                label="Nome Completo" 
                value={user.name || "Não definido"} 
              />
              <InfoField 
                icon={<Mail className="text-gray-400" />} 
                label="E-mail" 
                value={user.email} 
              />              
              <InfoField 
                icon={<Briefcase className="text-gray-400" />} 
                label="Curso" 
                value={user.course || "Não definido"} 
              />
              <InfoField 
                icon={<Calendar className="text-gray-400" />} 
                label="Data de Nascimento" 
                value={user.birthDate || "Não definido"} 
              />
              <InfoField 
                icon={<MapPin className="text-gray-400" />} 
                label="Localização" 
                value={user.address || "Não definido"} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente auxiliar para as linhas de dados
function InfoField({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
      <div className="mt-1">{icon}</div>
      <div className="flex flex-col items-start">
        <span className="text-xs font-medium text-primary-blue uppercase tracking-wider">{label}</span>
        <span className="text-lg text-gray-800 font-medium">{value}</span>
      </div>
    </div>
  );
}