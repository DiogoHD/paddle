import { Header } from "@/components/Header";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useFriends, useRemoveFriendship, useRespondFriendshipRequest } from "@/services/friendsService";
import { FriendCard, FriendRequestCard } from "@/components/FriendCard";
import { useState } from "react";
import { EmptyState, LoadingState } from "@components/States";

type FriendsTab = "friends" | "received" | "sent";

const tabs: { label: string; value: FriendsTab }[] = [
  { label: "Amigos", value: "friends" },
  { label: "Recebidos", value: "received" },
  { label: "Enviados", value: "sent" },
];

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<FriendsTab>("friends");

  const { data: friends, isLoading, error } = useFriends();
  const { mutate: removeFriendship } = useRemoveFriendship();
  const { mutate: respondFriendshipRequest } = useRespondFriendshipRequest();

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
        <div className="flex flex-col items-center justify-start gap-4 p-4 h-full w-full">
          {isLoading && <LoadingState message="A carregar amigos..." />}
          {error && <p className="text-2xl">Erro ao carregar amigos</p>}
          {!isLoading && accepted?.length === 0 && <EmptyState message="Sem amigos adicionados" />}
          {accepted?.map(f => (
            <FriendCard
              key={f.public_id}
              name={f.from_user === f.user_public_id ? f.from_user_name : f.to_user_name}
              img_src={f.from_user === f.user_public_id ? f.from_user_img_src : f.to_user_img_src}
              onRemove={() => removeFriendship(f.public_id)}
            />
          ))}
        </div>
      )}
      {activeTab === "received" && (
        <div className="flex flex-col items-center justify-start gap-4 p-4 h-full w-full">
          {isLoading && <LoadingState message="A carregar pedidos recebidos..." />}
          {error && <p className="text-2xl">Erro ao carregar pedidos recebidos</p>}
          {!isLoading && pendingReceived?.length === 0 && <EmptyState message="Sem pedidos de amizade recebidos" />}
          {pendingReceived?.map(f => (
            <FriendRequestCard
              key={f.public_id}
              name={f.from_user_name}
              img_src={f.from_user_img_src}
              onAccept={() => respondFriendshipRequest({ requestId: f.public_id, status: "accepted" })}
              onReject={() => respondFriendshipRequest({ requestId: f.public_id, status: "rejected" })}
            />
          ))}
        </div>
      )}
      {activeTab === "sent" && (
        <div className="flex flex-col items-center justify-start gap-4 p-4 h-full w-full">
          {isLoading && <LoadingState message="A carregar pedidos enviados..." />}
          {error && <p className="text-2xl">Erro ao carregar pedidos enviados</p>}
          {!isLoading && pendingSent?.length === 0 && <EmptyState message="Sem pedidos enviados" />}
          {pendingSent?.map(f => (
            <FriendCard
              key={f.public_id}
              name={f.to_user_name}
              img_src={f.to_user_img_src}
              onRemove={() => removeFriendship(f.public_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}