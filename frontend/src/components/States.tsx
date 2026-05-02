import sad_raquete from "@assets/sad-raquete.png";
import loading_raquete from "@assets/loading-raquete.gif";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center align-middle gap-4 h-full w-full">
      <img src={sad_raquete} alt="Sad Raquete" className="size-56"/>
      <p className="text-2xl">{message}</p>
    </div>
  );
}

export function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center align-middle gap-4 h-full w-full">
      <img src={loading_raquete} alt="Loading Raquete" className="size-56"/>
      <p className="text-2xl">{message}</p>
    </div>
  );
}