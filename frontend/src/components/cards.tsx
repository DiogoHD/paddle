type usr = {
  name: string,
  avatarUrl: string
}

type MatchCardProps = {
  time: string,
  pitch: number,
  people: usr[]
}


function MatchCard({
  time,
  pitch,
  people
}: MatchCardProps) {
  return (
    <div className="bg-white rounded-4xl border border-primary-blue shadow-md p-4 mb-4">
      <p className="text-xl font-bold mb-2">{time}</p>
      <div className="flex flex-row items-center mb-2">
        {people.map((person, index) => (
          <img
            key={index}
            src={person.avatarUrl}
            alt={person.name}
            className="w-10 h-10 rounded-full mr-2"
          />
        ))}
        <p className="font-bold text-lg mx-2 text-black">VS</p>
        {people.map((person, index) => (
          <img
            key={index}
            src={person.avatarUrl}
            alt={person.name}
            className="w-10 h-10 rounded-full mr-2"
          />
        ))}
      </div>
      <p className="font-bold text-md">Campo {pitch}</p>
    </div>
  );
}

function CreateMatchPopUp(trigger: React.ReactNode) {
  return (
    
    <div className="bg-primary-blue rounded-4xl border border-primary-blue shadow-md p-4 mb-4 flex items-center justify-center text-white font-bold text-xl">
      Criar Partida
    </div>
  );
}

function FilterPopUp() {
  return (
    <div className="bg-primary-blue rounded-4xl border border-primary-blue shadow-md p-4 mb-4 flex items-center justify-center text-white font-bold text-xl">
      Filtrar Partidas
    </div>
  );
}

export {
  CreateMatchPopUp,
  FilterPopUp,
  MatchCard
};
