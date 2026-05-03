import { Header } from "@/components/Header";
import { MatchDetailsPopUp } from "@/components/Popups";
import FiltersPopUp from "@/components/Filter";
import { EmptyState, LoadingState, ErrorState } from "@/components/States";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import type { Match } from "@/types/matches";

type FilterFormValues = {
  access: "",
  matchType: "",
};

export default function MatchPageLayout({
  title,
  leftNode,
  rightNode,
  emptyMessage,
  useFunction,
}: {
  title: string;
  emptyMessage?: string;
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
  useFunction: () => { data: Match[] | undefined ;
    isLoading: boolean;
    error: any;
  };
}) {
  const { data: matches, isLoading, error } = useFunction();

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
    <div className="h-full w-full flex flex-col overflow-hidden">
      <Header
        text={title}
        leftNode={leftNode}
        rightNode={ rightNode || <FiltersPopUp control={control} reset={reset} /> } 
      />
      <p className="text-center mt-3">
        {filteredMatches && filteredMatches.length > 0 && `A mostrar ${filteredMatches.length} de ${matches?.length || 0} partidas`}
      </p>
      <div className="flex flex-col items-start gap-4 p-4 h-full w-full overflow-y-auto">
        {isLoading && <LoadingState message="Carregando partidas..." />}
        {error && <ErrorState message="Erro ao carregar partidas" />}
        {!isLoading && filteredMatches && filteredMatches.length === 0 && (
          <EmptyState message={emptyMessage || "Sem Partidas Disponíveis"} />
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