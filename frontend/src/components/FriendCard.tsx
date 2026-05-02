import { Trash2, X, Check } from "lucide-react"
import { DeletePopUp } from "@components/AlertPopUps"

export function FriendCard({ name, img_src, onRemove }: { name: string, img_src: string | null, onRemove: () => void }) {
  return (
    <div className="flex flex-row w-full justify-between items-center gap-4 bg-white rounded-4xl border border-primary-blue shadow-md p-4">
      <div className="flex flex-row items-center gap-2">
        {img_src ? (
          <img
            src={img_src}
            alt={name}
            className="size-16 rounded-full object-cover"
          />
        ) : (
          <div className="size-10 rounded-full bg-primary-blue flex items-center justify-center">
            <p className="text-white text-2xl items-center">{name.charAt(0).toUpperCase()}</p>
          </div>
        )}
        <p className="flex-1 text-lg font-bold text-gray-800">{name}</p>
      </div>
      <DeletePopUp
        description={`Tem certeza que deseja remover ${name}?`}
        onRemove={onRemove}
      />
    </div>
  )
}

export function FriendRequestCard({ name, img_src, onAccept, onReject }: { name: string, img_src: string | null, onAccept: () => void, onReject: () => void }) {
  return (
    <div className="flex flex-row w-full justify-between items-center gap-4 bg-white rounded-4xl border border-primary-blue shadow-md p-4">
      <div className="flex flex-row items-center gap-2">
        {img_src ? (
          <img
            src={img_src}
            alt={name}
            className="size-16 rounded-full object-cover"
          />
        ) : (
          <div className="size-10 rounded-full bg-primary-blue flex items-center justify-center">
            <p className="text-white text-2xl items-center">{name.charAt(0).toUpperCase()}</p>
          </div>
        )}
        <p className="flex-1 text-lg font-bold text-gray-800">{name}</p>
      </div>
      <div className="flex flex-row gap-2">
        <button onClick={onAccept} className="text-green-500 hover:cursor-pointer">
          <Check className="size-6" />
        </button>
        <button onClick={onReject} className="text-red-500 hover:cursor-pointer">
          <X className="size-6" />
        </button>
      </div>
    </div>
  )
}