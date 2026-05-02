import { Header } from "@components/headers";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { EmptyState, LoadingState } from "@/components/States";
import { useUserMatchHistory } from "@/services/matchesService";
import MatchDetailsPopUp from "@/components/popups/MatchDetailsPopUp";

export default function MatchHistoryPage() {
  const { data: matchHistory, isLoading, error } = useUserMatchHistory();

    return (
        <div className="h-full w-full gap-4 flex flex-col">
            <Header 
                text="Histórico de Partidas" 
                leftNode={<Link to="/profile"><ArrowLeft className="size-8 text-white" /></Link>} 
            />
            <div className="flex flex-col items-center justify-center gap-4 p-6 h-full w-full">
                {isLoading && <LoadingState message="Carregando histórico..." />}
                {error && <p className="text-2xl">Erro ao carregar histórico</p>}
                {matchHistory && matchHistory.length === 0 && (
                    <EmptyState message="Sem histórico de partidas" />
                )}
                {matchHistory?.map((match, index) => (
                    <MatchDetailsPopUp
                        match={match}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}