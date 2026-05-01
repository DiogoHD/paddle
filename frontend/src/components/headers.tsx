import { CreateMatchPopUp, FiltersPopUp } from "./popups";


function MatchHeader() {
  return (
    <div className="top-0 flex py-4 px-10 justify-between bg-primary-blue text-white w-full">
      <div className="hover:text-gray-300">
        <CreateMatchPopUp />
      </div>
      <p className="text-2xl">Procurar Partida</p>
      <div className="hover:text-gray-300">
        <FiltersPopUp />
      </div>
    </div>
  );
}

function HomeHeader() {
  return (
    <div className="top-0 flex py-4 px-10 justify-between bg-primary-blue text-white w-full">
      <p className="text-2xl">As Minhas Partidas</p>
      <div className="hover:text-gray-300">
        <FiltersPopUp />
      </div>
    </div>
  );
}

function ProfileHeader() {
  return (
    <div className="top-0 flex py-4 px-10 justify-between bg-primary-blue text-white w-full">
      <p className="text-2xl">Perfil</p>
    </div>
  );
}

export {
  HomeHeader,
  ProfileHeader,
  MatchHeader
}
