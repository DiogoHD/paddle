import { Trash2 } from "lucide-react"
import type { Friend } from "@appTypes/friends"


export function FriendCard({ friend, onRemove }: { friend: Friend, onRemove: () => void }) {
  return (
    <div className="flex flex-row w-full justify-between items-center gap-4 bg-white rounded-4xl border border-primary-blue shadow-md p-4">
      <div className="flex flex-row items-center gap-2">
        <img
            src={friend.img_src}
            alt={friend.name}
            className="size-16 rounded-full object-cover"
        />
        <p className="flex-1 text-lg font-bold text-gray-800">{friend.name}</p>
      </div>
      <button onClick={onRemove} className="text-red-500 hover:cursor-pointer">
        <Trash2 className="size-6" />
      </button>
    </div>
  )
}