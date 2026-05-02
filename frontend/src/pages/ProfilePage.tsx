import { 
  Settings,
  ArrowRight,
  Award,
  UsersRound,
  FileChartColumn,
  FileUser,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Headers";
import { LogoutPopUp } from "@/components/popups/AlertPopUps";

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

  return (
    <div className="h-full w-full gap-4 flex flex-col">
      <Header text="Perfil" />

      <img className="rounded-full border-2 border-primary-blue size-32 mx-auto" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile Image" />
      <p className="text-center text-2xl font-bold">João Silva</p>

      <div className="flex flex-col gap-4 p-4">
        <Link to="/personal-data"><BodyEntry icon={<FileUser className="size-10" />} label="Dados Pessoais" /></Link>
        <Link to="/friends"><BodyEntry icon={<UsersRound className="size-10" />} label="Amigos" /></Link>
        <Link to="/achievements"><BodyEntry icon={<Award className="size-10" />} label="Conquistas" /></Link>
        <Link to="/match-history"><BodyEntry icon={<FileChartColumn className="size-10" />} label="Histórico de Partidas" /></Link>
        <Link to="/settings"><BodyEntry icon={<Settings className="size-10" />} label="Configurações" /></Link>

        <LogoutPopUp />
      </div>
    </div>
  );
}