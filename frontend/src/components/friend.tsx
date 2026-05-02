import type { Friend } from "@appTypes/friends"
import { DeletePopUp } from "@components/popups/AlertPopUps"

export function FriendCard({ friend, onRemove }: { friend: Friend, onRemove: () => void }) {
  console.log(friend) // Log the friend object to check its structure
  return (
    <div className="flex flex-row w-full justify-between items-center gap-4 bg-white rounded-4xl border border-primary-blue shadow-md p-4">
      <div className="flex flex-row items-center gap-2">
        { friend.img_src ? (
          <img
            src={friend.img_src}
            alt={friend.name}
            className="size-16 rounded-full object-cover"
          />
        ) : (
          <div className="size-10 rounded-full bg-primary-blue flex items-center justify-center">
            <p className="text-white text-2xl items-center">{friend.name.charAt(0).toUpperCase()}</p>
          </div>
        )}
        <p className="flex-1 text-lg font-bold text-gray-800">{friend.name}</p>
      </div>
      <DeletePopUp
        description={`Tem certeza que deseja remover ${friend.name}?`}
        onRemove={onRemove}
      />
    </div>
  )
}