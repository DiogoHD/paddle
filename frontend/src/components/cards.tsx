import { PlusCircle, Globe, Lock } from "lucide-react"

export type usr = {
  name: string,
  avatarUrl: string
}

export type MatchCardProps = {
  date: string,
  start: string,
  end: string,
  pitch: number,
  visibility: "public" | "private",
  people: (usr|null)[]
}


function MatchCard({
  match,
  dateString,
  ...props
}: React.ComponentProps<"div"> & {
  match: MatchCardProps,
  dateString: string
}) {
  const midIndex = Math.ceil(match.people.length / 2);
  const team1 = match.people.slice(0, midIndex);
  const team2 = match.people.slice(midIndex);

  return (
    <div className="flex flex-col gap-4 w-full bg-white rounded-4xl border border-primary-blue shadow-md p-4" {...props}>
      <div className="flex flex-row items-center justify-between text-xl font-bold">
        <p className="font-bold text-md">Campo {match.pitch}</p>
        <p className="font-bold">{match.start} - {match.end}</p>
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        {team1.map((person, index) => (
          person ? (
            <img
              key={index}
              src={person.avatarUrl}
              alt={person.name}
              className="size-10 rounded-full"
            />
          ) : (
            <PlusCircle key={index} className="size-10" />
          )
        ))}
        <p className="font-bold text-lg mx-2 text-primary-blue">VS</p>
        {team2.map((person, index) => (
          person ? (
            <img
              key={index}
              src={person.avatarUrl}
              alt={person.name}
              className="size-10 rounded-full"
            />
          ) : (
            <PlusCircle key={index} className="size-10" />
          )
        ))}
      </div>      
      <div className="flex flex-row items-center justify-between text-xl font-bold">
        <p className="text-lg">{dateString.charAt(0).toUpperCase() + dateString.slice(1)}</p>
        {match.visibility === "public" ? (
          <Globe className="size-6 text-green-500" />
        ) : (
          <Lock className="size-6 text-red-500" />
        )}
      </div>
    </div>
  );
}


export {
  MatchCard
};
