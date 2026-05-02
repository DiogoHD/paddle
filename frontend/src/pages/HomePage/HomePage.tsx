import { Header } from "@/components/headers";
import { FiltersPopUp } from "@/components/popups/popups";
import sad_raquete from "@/assets/sad-raquete.png";

export default function HomePage() {

  return (
    <div className="h-full w-full flex flex-col">
      <Header text="As Minhas Partidas" rightNode={<FiltersPopUp />} />
      <div className="flex flex-col items-center justify-center align-middle gap-4 h-full w-full">

        <img src={sad_raquete} alt="Sad Raquete" className="size-56"/>
        <p className="text-2xl">Sem partidas agendadas</p>

      </div>
    </div>
  );
}

