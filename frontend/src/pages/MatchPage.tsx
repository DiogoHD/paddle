import { Header } from "@/components/Header";
import { CreateMatchPopUp, MatchDetailsPopUp } from "@/components/Popups";
import FiltersPopUp from "@/components/Filter";
import { EmptyState, LoadingState, ErrorState } from "@/components/States";
import { useMatches } from "@services/matchesService";

export default function MatchPage() {
  const { data: matches, isLoading, error } = useMatches();

  return (
    <div className="h-full w-full gap-4 flex flex-col overflow-hidden no-scrollbar">
      <Header text="Procurar Partida" leftNode={<CreateMatchPopUp />} rightNode={<FiltersPopUp />} />
      <div className="flex flex-col items-start gap-4 p-4 h-full w-full overflow-y-auto">
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