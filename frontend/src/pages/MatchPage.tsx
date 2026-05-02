import { Header } from "@/components/Headers";
import { CreateMatchPopUp, FiltersPopUp } from "@/components/Popups";
import { EmptyState, LoadingState } from "@/components/States";
import MatchDetailsPopUp from "@/components/popups/MatchDetailsPopUp";
import { useMatches } from "@services/matchesService";

export default function MatchPage() {
  const { data: matches, isLoading, error } = useMatches();

  return (
    <div className="h-full w-full gap-4 flex flex-col no-scrollbar">
      <Header text="Procurar Partida" leftNode={<CreateMatchPopUp />} rightNode={<FiltersPopUp />} />
      <div className="flex flex-col items-center justify-center gap-4 p-6 h-full w-full">
        {isLoading && <LoadingState message="Carregando partidas..." />}
        {error && <p className="text-2xl">Erro ao carregar partidas</p>}
        {matches && matches.length === 0 && (
          <EmptyState message="Sem partidas disponíveis" />
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