import { Trash2, X, Check } from "lucide-react"

export function FriendCard({ name, img_src, onRemove }: { name: string, img_src: string | null, onRemove: () => void }) {
  return (
    <div className="flex flex-row w-full justify-between items-center gap-4 bg-white rounded-4xl border border-primary-blue shadow-md p-4">
      <div className="flex flex-row items-center gap-2">
        <img
            src={img_src ?? undefined}
            alt={name}
            className="size-16 rounded-full object-cover"
        />
        <p className="flex-1 text-lg font-bold text-gray-800">{name}</p>
      </div>
      <button onClick={onRemove} className="text-red-500 hover:cursor-pointer">
        <Trash2 className="size-6" />
      </button>
    </div>
  )
}

export function FriendRequestCard({ name, img_src, onAccept, onReject }: { name: string, img_src: string | null, onAccept: () => void, onReject: () => void }) {
  return (
    <div className="flex flex-row w-full justify-between items-center gap-4 bg-white rounded-4xl border border-primary-blue shadow-md p-4">
      <div className="flex flex-row items-center gap-2">
        <img
            src={img_src ?? undefined}
            alt={name}
            className="size-16 rounded-full object-cover"
        />
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