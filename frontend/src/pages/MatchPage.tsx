import MatchPageLayout from "@/pages/MatchPageLayout";
import { useMatches } from "@services/matchesService";
import { CreateMatchPopUp } from "@/components/Popups";

export default function MatchPage() {
  return (
    <MatchPageLayout
      title="Procurar Partida"
      leftNode={<CreateMatchPopUp />}
      useFunction={useMatches}
    />
  );
}