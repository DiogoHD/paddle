import { Header } from "@/components/Header";
import FiltersPopUp from "@/components/Filter";
import { EmptyState, LoadingState, ErrorState } from "@/components/States";
import { useUserMatches } from "@services/matchesService";
import { MatchDetailsPopUp } from "@/components/Popups";

export default function HomePage() {
  const { data: matches, isLoading, error } = useUserMatches();

  return (
    <div className="h-full w-full flex flex-col overflow-hidden no-scrollbar gap-4">
      <Header text="As Minhas Partidas" rightNode={<FiltersPopUp />} />
      <div className="flex flex-col items-center align-middle p-4 gap-4 h-full w-full overflow-y-auto">
        {isLoading && <LoadingState message="Carregando partidas..." />}
        {error && <ErrorState message="Erro ao carregar partidas" />}
        {matches && matches.length === 0 && (
          <div className="flex flex-1 items-center justify-center h-full">
            <EmptyState message="Sem partidas disponíveis" />
          </div>
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

