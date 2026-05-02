import { Header } from "@/components/Headers";
import { EmptyState, LoadingState } from "@/components/States";
import { useUserMatches } from "@services/matchesService";
import MatchDetailsPopUp from "@/components/popups/MatchDetailsPopUp";
import { FiltersPopUp } from "@/components/Popups";

export default function HomePage() {
  const { data: matches, isLoading, error } = useUserMatches();

  return (
    <div className="h-full w-full flex flex-col">
      <Header text="As Minhas Partidas" rightNode={<FiltersPopUp />} />
      <div className="flex flex-col items-center justify-center align-middle p-6 gap-4 h-full w-full">
        {isLoading && <LoadingState message="Carregando partidas..." />}
        {error && <p className="text-2xl">Erro ao carregar partidas</p>}
        {matches && matches.length === 0 && (
          <EmptyState message="Sem partidas agendadas" />
        )}
        {matches?.map((match, index) => (
          <MatchDetailsPopUp
            match={match}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

