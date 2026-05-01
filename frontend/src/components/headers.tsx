import { Plus, EllipsisVertical } from "lucide-react";

export function MatchHeader() {
  return (
    <div className="top-0 flex py-4 px-10 justify-between bg-primary-blue text-white w-full">
      <div className="hover:text-gray-300">
        <Plus className="size-8" />
      </div>
      <p className="text-2xl">Procurar Partida</p>
      <div className="hover:text-gray-300">
        <EllipsisVertical className="size-8" />
      </div>
    </div>
  );
}

export function HomeHeader() {
  return (
    <div className="top-0 flex py-4 px-10 justify-between bg-primary-blue text-white w-full">
      <p className="text-2xl">As Minhas Partidas</p>
      <div className="hover:text-gray-300">
        <EllipsisVertical className="size-8" />
      </div>
    </div>
  );
}

export function ProfileHeader() {
  return (
    <div className="top-0 flex py-4 px-10 justify-between bg-primary-blue text-white w-full">
      <p className="text-2xl">Perfil</p>
    </div>
  );
}
