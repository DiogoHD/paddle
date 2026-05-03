import MatchPageLayout from "@/pages/MatchPageLayout";
import { useUserMatches } from "@services/matchesService";

export default function HomePage() {
  return (
    <MatchPageLayout
      title="As Minhas Partidas"
      emptyMessage="Sem Partidas Agendadas."
      useFunction={useUserMatches}
    />
  );
}