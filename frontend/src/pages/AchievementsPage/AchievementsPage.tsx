import { Header } from "@components/headers";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AchievementsPage() {

    return (
        <div className="h-full w-full gap-4 flex flex-col">
            <Header 
                text="Conquistas" 
                leftNode={<Link to="/profile"><ArrowLeft className="size-8 text-white" /></Link>} 
            />
            <div className="flex flex-col items-center justify-center align-middle gap-4 h-full w-full">
                <p className="text-2xl">Sem conquistas desbloqueadas</p>
            </div>
        </div>
    );
}