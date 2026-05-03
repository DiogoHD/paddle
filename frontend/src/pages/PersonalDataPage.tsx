import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, User, Mail, Calendar, Briefcase, 
  Pencil, Check, X, Phone, Camera 
} from "lucide-react";

// Components
import { Header } from "@/components/Header";
import { LoadingState, ErrorState } from "@/components/States";
import type { UserProfileUpdate } from "@appTypes/accounts";

// Hooks & Services
import { useUserProfile, useUpdateUserProfile } from "@services/accountsService";

/**
 * Props para o componente auxiliar de campo de informação
 */
interface InfoFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isEditing?: boolean;
  type?: string;
  onChange?: (val: string) => void;
}

function InfoField({ 
  icon, 
  label, 
  value, 
  isEditing = false, 
  type = "text", 
  onChange 
}: InfoFieldProps) {
  return (
    <div className="flex items-start gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
      <div className="mt-1 shrink-0">{icon}</div>
      <div className="flex flex-col items-start w-full text-start">
        <span className="text-5 font-bold text-primary-blue uppercase tracking-widest mb-1">
          {label}
        </span>
        
        {isEditing && onChange ? (
          <input 
            type={type}
            className="w-full text-lg text-gray-800 font-medium border-b-2 border-primary-blue focus:outline-none bg-blue-50/50 px-1 rounded-t-sm transition-colors"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <span className="text-lg text-gray-800 font-medium break-all">
            {value || "Não definido"}
          </span>
        )}
      </div>
    </div>
  );
}

export default function PersonalDataPage() {
  // Hooks de Dados
  const { data: user, isLoading, isError } = useUserProfile();
  const updateProfile = useUpdateUserProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfileUpdate>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Ativa o modo de edição e preenche o form com os dados atuais
  const handleStartEdit = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        birthday: user.birthday || "",
        course: user.course || "",
        phone_number: user.phone_number || "",
      });
      setPreviewUrl(null);
      setIsEditing(true);
    }
  };

  // Cancela a edição e limpa o form
  const handleCancel = () => {
    setIsEditing(false);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Lida com a mudança de imagem, atualizando o formData e criando um preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Limpa o URL anterior para evitar memory leaks
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      setFormData({ ...formData, image: file });
      // Cria um URL temporário para mostrar a imagem no ecrã
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Envia os dados para o backend via Mutation
  const handleSave = () => {
    updateProfile.mutate(formData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  // Fallback for profile image
  const currentImage = previewUrl || (user?.image?.startsWith("http") 
    ? user.image 
    : user?.image ? `http://localhost:8000${user.image}` : "/default-profile.png");

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Header 
        text="Dados Pessoais" 
        leftNode={
          <Link to="/profile">
            <ArrowLeft className="size-8 text-white" />
          </Link>
        }
        rightNode={
          user && (
            <button 
              onClick={isEditing ? handleSave : handleStartEdit}
              disabled={updateProfile.isPending}
              className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-90"
              title={isEditing ? "Guardar" : "Editar"}
            >
              {isEditing ? (
                <Check className="size-7 text-white" />
              ) : (
                <Pencil className="size-6 text-white" />
              )}
            </button>
          )
        }
      />

      <div className="flex flex-col gap-4 p-4 overflow-y-auto">
        {isLoading && <LoadingState message="A carregar os teus dados..." />}
        {(isError || updateProfile.isError) && (
          <ErrorState message="Ocorreu um erro ao processar os dados." />
        )}

        {user && !isLoading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Cabeçalho Visual */}
            <div className="h-2 bg-primary-blue w-full" />
            
            <div className="p-6 space-y-6">
              {/* Imagem de Perfil */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative group">
                  <img 
                    src={currentImage} 
                    alt="Profile" 
                    className={`size-32 rounded-full object-cover border-4 ${isEditing ? 'border-primary-blue shadow-lg' : 'border-gray-100'}`}
                  />
                  
                  {isEditing && (
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white transition-opacity hover:cursor-pointer"
                    >
                      <Camera className="size-8" />
                    </button>
                  )}
                </div>
                
                {/* Input de ficheiro escondido */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {isEditing && <p className="text-xs font-bold text-primary-blue uppercase">Clica na foto para mudar</p>}
              </div>

              {/* Nome */}
              <InfoField 
                icon={<User className="text-gray-400 size-5" />} 
                label="Nome Completo" 
                isEditing={isEditing}
                value={isEditing ? (formData.name ?? "") : user.name}
                onChange={(val) => setFormData({ ...formData, name: val })}
              />

              {/* Curso */}
              <InfoField 
                icon={<Briefcase className="text-gray-400 size-5" />} 
                label="Curso" 
                isEditing={isEditing}
                value={isEditing ? (formData.course ?? "") : user.course}
                onChange={(val) => setFormData({ ...formData, course: val })}
              />

              {/* Telemóvel */}
              <InfoField 
                icon={<Phone className="text-gray-400 size-5" />} 
                label="Telemóvel" 
                isEditing={isEditing}
                type="tel"
                value={isEditing ? (formData.phone_number ?? "") : user.phone_number}
                onChange={(val) => setFormData({ ...formData, phone_number: val })}
              />

              {/* Data de Nascimento */}
              <InfoField 
                icon={<Calendar className="text-gray-400 size-5" />} 
                label="Data de Nascimento" 
                isEditing={isEditing}
                type="date"
                value={isEditing ? (formData.birthday ?? "") : user.birthday}
                onChange={(val) => setFormData({ ...formData, birthday: val })}
              />

              {/* E-mail (Apenas Leitura) */}
              <InfoField 
                icon={<Mail className="text-gray-400 size-5" />} 
                label="E-mail (Não editável)" 
                value={user.email} 
              />

              {/* Botão de Cancelar - Visível apenas em modo edição */}
              {isEditing && (
                <div className="pt-4">
                  <button 
                    onClick={handleCancel}
                    className="w-full py-3 flex items-center justify-center gap-2 text-white bg-red-500 font-bold border border-red-50 rounded-xl hover:bg-red-300 hover:cursor-pointer transition-colors"
                  >
                    <X className="size-5" />
                    Cancelar Alterações
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {updateProfile.isPending && (
          <p className="text-center text-sm text-primary-blue animate-pulse">
            A guardar alterações no servidor...
          </p>
        )}
      </div>
    </div>
  );
}