import { House, Search, CircleUserRound } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

export function NavBar() {
  const { pathname } = useLocation();
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    // h-screen e overflow-hidden no pai impedem que a página toda faça scroll
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      
      {/* 1. O HEADER (Se estiver aqui) entraria aqui sem fixed */}
      {/* <Header text="Procurar Partida" /> */}

      {/* 2. CONTEÚDO: flex-1 faz este gajo ocupar todo o espaço central */}
      <main className="flex-1 overflow-y-auto"> 
        <Outlet />
      </main>

      {/* 3. NAVBAR: Sem fixed/absolute, ela fica "presa" no fundo pelo flexbox */}
      <div className="bg-primary-blue border-t border-gray-200 rounded-t-3xl shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50">
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
      className="relative flex flex-col items-center justify-center gap-1 transition-all duration-200 w-20 h-16 text-white"
    >
      <div className={`p-1.5 rounded-xl transition-colors ${active ? "bg-blue-50 text-primary-blue" : ""}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-semibold uppercase tracking-wider ${active ? "opacity-100" : "opacity-70"}`}>
        {label}
      </span>
      {active && (
        <span className="absolute -bottom-0.5 w-1/2 h-0.5 bg-white rounded-full"></span>
      )}
    </Link>
  );
}