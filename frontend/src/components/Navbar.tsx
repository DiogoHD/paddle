import { House, Search, CircleUserRoundIcon } from "lucide-react";
import { Outlet, Link, useLocation} from "react-router-dom";

export function NavBar() {
  const { pathname } = useLocation();

  const iconClass = (path: string) =>
    pathname.startsWith(path) ? "text-gray-400" : "text-white hover:text-gray-300";

  return (
    // h-screen prende o layout à altura exata do ecrã
    <div className="flex flex-col h-screen overflow-hidden">
      
      {/* Área de Conteúdo: o flex-1 ocupa o espaço todo que sobra */}
      <main className="flex-1 overflow-y-auto"> 
        <Outlet />
      </main>

      {/* NavBar: Fica sempre no fundo, sem flutuar por cima do conteúdo */}
      <nav className="flex py-4 px-10 justify-between bg-primary-blue text-white w-full border-t bg-linear-to-b from-primary-blue to-blue-700">
        <Link to="/matches" className={iconClass("/matches")}>
          <Search className="size-10" />
        </Link>
        <Link to="/home" className={iconClass("/home")}>
          <House className="size-10" />
        </Link>
        <Link to="/profile" className={iconClass("/profile")}>
          <CircleUserRoundIcon className="size-10" />
        </Link>
      </nav>
    </div>
  );
}