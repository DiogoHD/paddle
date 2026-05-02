import { Header } from "@/components/Headers";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AchievementCard } from "@/components/AchievementCard";
import { useAchievements } from "@/services/achievementServices";

export default function AchievementsPage() {

    const { data: achievements, isLoading, error } = useAchievements();

    return (
        <div className="h-full w-full gap-4 flex flex-col overflow-hidden">
            <Header 
                text="Conquistas" 
                leftNode={<Link to="/profile"><ArrowLeft className="size-8 text-white" /></Link>} 
            />
            <div className="flex flex-col gap-4 p-4 overflow-y-auto">
                {isLoading && <p>Carregando conquistas...</p>}
                {error && <p>Erro ao carregar conquistas: {error.message}</p>}
                {achievements && achievements.length === 0 && <p>Nenhuma conquista encontrada.</p>}
                {achievements?.map((achievement) => (
                    <AchievementCard key={achievement.public_id} achievement={achievement} />
                ))}
            </div>
        </div>
    );
}