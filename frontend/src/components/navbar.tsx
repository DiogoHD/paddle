import { House, Search, CircleUserRoundIcon } from "lucide-react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    // h-screen prende o layout à altura exata do ecrã
    <div className="flex flex-col h-screen overflow-hidden">
      
      {/* Área de Conteúdo: o flex-1 ocupa o espaço todo que sobra */}
      <main className="flex-1 overflow-y-auto"> 
        <Outlet />
      </main>

      {/* NavBar: Fica sempre no fundo, sem flutuar por cima do conteúdo */}
      <nav className="flex py-4 px-10 justify-between bg-primary-blue text-white w-full border-t border-blue-400">
        <Link to="/matches" className="hover:text-gray-300">
          <Search className="size-10" />
        </Link>
        <Link to="/home" className="hover:text-gray-300">
          <House className="size-10" />
        </Link>
        <Link to="/profile" className="hover:text-gray-300">
          <CircleUserRoundIcon className="size-10" />
        </Link>
      </nav>
    </div>
  );
}