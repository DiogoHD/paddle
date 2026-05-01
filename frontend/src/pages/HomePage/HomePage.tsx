import { HomeHeader } from "@/components/headers";

export default function HomePage() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <HomeHeader />
      <div className="flex flex-col items-center justify-center mt-20">
        <p className="text-2xl">Sem partidas agendadas</p>
      </div>
    </div>
  );
}

