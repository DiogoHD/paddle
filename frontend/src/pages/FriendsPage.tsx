import { Header } from "@/components/Header";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useFriends, useRemoveFriend } from "@/services/friendsService";
import { FriendCard, FriendRequestCard } from "@/components/FriendCard";
import { useState } from "react";

type FriendsTab = "friends" | "received" | "sent";

const tabs: { label: string; value: FriendsTab }[] = [
  { label: "Amigos", value: "friends" },
  { label: "Recebidos", value: "received" },
  { label: "Enviados", value: "sent" },
];

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<FriendsTab>("friends");

  const { data: friends, isLoading, error } = useFriends();
  const { mutate: removeFriend } = useRemoveFriend();

  const accepted = friends?.filter(f => f.status === "accepted") ?? [];
  const pendingReceived = friends?.filter(f => f.status === "pending" && f.from_user === f.user_public_id) ?? [];
  const pendingSent = friends?.filter(f => f.status === "pending" && f.to_user === f.user_public_id) ?? [];

  return (
    <div className="h-full w-full gap-4 flex flex-col overflow-hidden">
      <Header 
        text="Amigos" 
        leftNode={<Link to="/profile"><ArrowLeft className="size-8 text-white" /></Link>}
        rightNode={<Plus className="size-8 text-white" />}
      />
      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-4">
        {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={`flex-1 py-2 text-sm font-semibold transition-colors
          ${activeTab === tab.value
            ? "border-b-2 border-primary-blue text-primary-blue"
            : "text-gray-400"
          }`}
        >
          {tab.label}
        </button>
        ))}
      </div>


      {/* Content */}
      {activeTab === "friends" && (
        <>
          {isLoading && <p className="text-2xl">Carregando amigos...</p>}
          {error && <p className="text-2xl">Erro ao carregar amigos</p>}
          {accepted?.length === 0 && <p className="text-2xl">Sem amigos adicionados</p>}
          {accepted?.map(f => (
            <FriendCard
              key={f.public_id}
              name={f.from_user === f.user_public_id ? f.from_user_name : f.to_user_name}
              img_src={f.from_user === f.user_public_id ? f.from_user_img_src : f.to_user_img_src}
              onRemove={() => removeFriend(f.public_id)}
            />
          ))}
        </>
      )}
      {activeTab === "received" && (
        <>
          {pendingReceived?.length === 0 && <p className="text-2xl">Sem pedidos recebidos</p>}
          {pendingReceived?.map(f => (
            <FriendRequestCard
              key={f.public_id}
              name={f.from_user_name}
              img_src={f.from_user_img_src}
              onAccept={() => removeFriend(f.public_id)}
              onReject={() => removeFriend(f.public_id)}
            />
          ))}
        </>
      )}
      {activeTab === "sent" && (
        <>
          {pendingSent?.length === 0 && <p className="text-2xl">Sem pedidos enviados</p>}
          {pendingSent?.map(f => (
            <FriendCard
              key={f.public_id}
              name={f.to_user_name}
              img_src={f.to_user_img_src}
              onRemove={() => removeFriend(f.public_id)}
            />
          ))}
        </>
      )}
    </div>
  );
}