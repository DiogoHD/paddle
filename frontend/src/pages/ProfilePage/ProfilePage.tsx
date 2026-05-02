import { 
  Settings,
  ArrowRight,
  Award,
  UsersRound,
  FileChartColumn,
  FileUser
} from "lucide-react";

import { ProfileHeader } from "@/components/headers";
import useAuth from "@/hooks/useAuth";

function BodyEntry({
  icon,
  label
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-row border border-primary-blue rounded-lg shadow-md p-2 gap-4 w-full hover:bg-gray-200 items-center">
      {icon}
      <p className="text-2xl text-bold">{label}</p>
      <ArrowRight className="size-8 text-primary-blue ml-auto cursor-pointer" />
    </div>
  );
}

export default function ProfilePage() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // navigation handled by AuthContext
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen w-full gap-4 flex flex-col overflow-y-auto no-scrollbar">
      <ProfileHeader />

      <img className="rounded-full border-2 border-primary-blue size-32 mx-auto" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile Image" />
      <p className="text-center text-2xl font-bold">João Silva</p>

      <div className="flex flex-col gap-4 px-4">
        <BodyEntry icon={<FileUser className="size-10" />} label="Dados Pessoais" />
        <BodyEntry icon={<UsersRound className="size-10" />} label="Amigos" />
        <BodyEntry icon={<Award className="size-10" />} label="Conquistas" />
        <BodyEntry icon={<FileChartColumn className="size-10" />} label="Histórico" />
        <BodyEntry icon={<Settings className="size-10" />} label="Configurações" />

        <button
          onClick={handleLogout}
          className="mt-32 flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors"
        >
          Terminar Sessão
        </button>
      </div>
    </div>
  );
}