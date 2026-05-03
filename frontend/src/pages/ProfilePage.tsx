import { 
  ArrowRight,
  Award,
  Crown,
  UsersRound,
  FileChartColumn,
  FileUser,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@components/Header";

import { LogoutPopUp } from "@components/AlertPopUps";
import { useUserProfile } from "@services/accountsService";
import { LoadingState, ErrorState } from "@components/States";

function BodyEntry({
  icon,
  label
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-row border border-primary-blue rounded-lg shadow-md p-2 gap-4 w-full hover:bg-gray-200 items-center hover:cursor-pointer">
      {icon}
      <p className="text-2xl text-bold">{label}</p>
      <ArrowRight className="size-8 text-primary-blue ml-auto cursor-pointer transition-colors" />
    </div>
  );
}

export default function ProfilePage() {

  const { data: user, isLoading, error } = useUserProfile();

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoadingState message="A carregar perfil..." />
      </div>
    );
  }

  const hasImage = user?.image && user.image.trim() !== "";
  const profileImage = hasImage
    ? (user.image.startsWith("http") 
        ? user.image 
        : `http://localhost:8000${user.image.startsWith('/') ? '' : '/'}${user.image}`)
    : "/default-profile.png";
  
  if (error || !user) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <ErrorState message="Erro ao carregar o utilizador." />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Header text="Perfil" />

      <div className="flex flex-col gap-4 p-4 overflow-y-auto">
        <img className="rounded-full border-2 border-primary-blue size-32 mx-auto" src={profileImage} alt="Profile Image" />
        <p className="text-center text-2xl font-bold">{user?.name}</p>

          <Link to="/personal-data"><BodyEntry icon={<FileUser className="size-10" />} label="Dados Pessoais" /></Link>
          <Link to="/friends"><BodyEntry icon={<UsersRound className="size-10" />} label="Amigos" /></Link>
          <Link to="/achievements"><BodyEntry icon={<Award className="size-10" />} label="Conquistas" /></Link>
          <Link to="/match-history"><BodyEntry icon={<FileChartColumn className="size-10" />} label="Histórico de Partidas" /></Link>
          <Link to="/leaderboard"><BodyEntry icon={<Crown className="size-10" />} label="Leaderboard" /></Link>

          <LogoutPopUp />
      </div>
    </div>
  );
}