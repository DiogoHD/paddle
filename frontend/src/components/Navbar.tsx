import { House, Search, CircleUserRound } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

export function NavBar() {
  const { pathname } = useLocation();
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    // O container principal deve ter o fundo cinzento para que o contraste funcione
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      
      {/* Área de Conteúdo: pb-24 para garantir que o conteúdo não fica escondido atrás da nav */}
      <main className="flex-1 overflow-y-auto pb-24"> 
        <Outlet />
      </main>

      {/* Criamos um container fixo no fundo, com altura total h-24 para esticar além da nav */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-white border-t border-gray-200 rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50">
        {/* A nav em si fica "dentro" do container arredondado, h-20 para os itens */}
        <nav className="flex h-24 items-center justify-around px-10">
          
          <NavItem 
            to="/matches" 
            icon={<Search size={26} strokeWidth={isActive("/matches") ? 2.5 : 2} />} 
            active={isActive("/matches")} 
            label="Partidas"
          />
          
          <NavItem 
            to="/home" 
            icon={<House size={26} strokeWidth={isActive("/home") ? 2.5 : 2} />} 
            active={isActive("/home")} 
            label="Início"
          />
          
          <NavItem 
            to="/profile" 
            icon={<CircleUserRound size={26} strokeWidth={isActive("/profile") ? 2.5 : 2} />} 
            active={isActive("/profile")} 
            label="Perfil"
          />

        </nav>
      </div>
    </div>
  );
}

function NavItem({ to, icon, active, label }: { to: string, icon: React.ReactNode, active: boolean, label: string }) {
  return (
    <Link 
      to={to} 
      className={`relative flex flex-col items-center justify-center gap-1 transition-all duration-200 w-20 h-16
        ${active ? "text-primary-blue" : "text-gray-400 hover:text-gray-600"}`}
    >
      <div className={`p-1.5 rounded-xl transition-colors ${active ? "bg-blue-50" : ""}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-semibold uppercase tracking-wider ${active ? "opacity-100" : "opacity-70"}`}>
        {label}
      </span>
      {active && (
        <span className="absolute -bottom-0.5 w-1/2 h-0.5 bg-primary-blue rounded-full"></span>
      )}
    </Link>
  );
}