import { HomeHeader } from "@/components/headers";
import useAuth from "@/hooks/useAuth";

export default function HomePage() {

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
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <HomeHeader />
      <div className="flex flex-col items-center justify-center">

        <p className="text-2xl">Sem partidas agendadas</p>

        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

