import { Header } from "@/components/Header";
import { CreateMatchPopUp, MatchDetailsPopUp } from "@/components/Popups";
import FiltersPopUp from "@/components/Filter";
import { EmptyState, LoadingState, ErrorState } from "@/components/States";
import { useMatches } from "@services/matchesService";
import { useForm } from "react-hook-form";
import { useMemo } from "react";

type FilterFormValues = {
  access: "",
  matchType: "",
};


export default function MatchPage() {
  const { data: matches, isLoading, error } = useMatches();

  const { control, watch, reset } = useForm<FilterFormValues>({
    defaultValues: {
      access: "",
      matchType: "",
    },
  });

  const filters = watch();

  // Apply filters with memorization
  const filteredMatches = useMemo(() => {
    if (!matches) return [];

    return matches.filter((match) => {
      const matchesAccess = filters.access
        ? (match.is_private == true && filters.access == "PRIVATE") || (match.is_private == false && filters.access == "PUBLIC")
        : true;

      const matchesType = filters.matchType
        ? match.match_type === filters.matchType
        : true;

      return matchesAccess && matchesType;
    });
  }, [filters.access, filters.matchType, matches]);

  return (
    <div className="h-full w-full gap-4 flex flex-col overflow-hidden no-scrollbar">
      <Header
        text="Procurar Partida"
        leftNode={<CreateMatchPopUp />}
        rightNode={<FiltersPopUp control={control} reset={reset} />} />
      <div className="flex flex-col items-start gap-4 p-4 h-full w-full overflow-y-auto">
        {isLoading && <LoadingState message="Carregando partidas..." />}
        {error && <ErrorState message="Erro ao carregar partidas" />}
        {filteredMatches && filteredMatches.length === 0 && (
          <div className="flex flex-1 items-center justify-center h-full">
            <EmptyState message="Sem partidas disponíveis" />
          </div>
        )}
        {filteredMatches?.map((match, index) => (
          <MatchDetailsPopUp
            match={match}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}