import { Header } from "@/components/Header";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useFriends, useRemoveFriend } from "@/services/friendsService";
import { FriendCard } from "@/components/FriendCard";

export default function FriendsPage() {

    const { data: friends, isLoading, error } = useFriends();
    const { mutate: removeFriend } = useRemoveFriend();

    return (
        <div className="h-full w-full gap-4 flex flex-col overflow-hidden">
            <Header 
                text="Amigos" 
                leftNode={<Link to="/profile"><ArrowLeft className="size-8 text-white" /></Link>}
                rightNode={<Plus className="size-8 text-white" />}
            />
            <div className="flex flex-col gap-4 p-4 overflow-y-auto">
                {isLoading && <p className="text-2xl">Carregando amigos...</p>}
                {error && <p className="text-2xl">Erro ao carregar amigos</p>}
                {friends && friends.length === 0 && (
                    <p className="text-2xl">Sem amigos adicionados</p>
                )}
                {friends?.map((friend) => (
                    <FriendCard 
                        key={friend.public_id} 
                        friend={friend} 
                        onRemove={() => removeFriend(friend.public_id)} 
                    />
                ))}
            </div>
        </div>
    );
}