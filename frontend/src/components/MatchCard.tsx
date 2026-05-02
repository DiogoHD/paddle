import { PlusCircle, Globe, Lock } from "lucide-react"
import type { Match } from "@/types/matches";

export type usr = {
  name: string,
  avatarUrl: string
}


function MatchCard({
  match,
  dateString,
  ...props
}: React.ComponentProps<"div"> & {
  match: Match,
  dateString: string
}) {
  const midIndex = Math.ceil(match.players.length / 2);
  const team1 = match.players.slice(0, midIndex);
  const team2 = match.players.slice(midIndex);
  const startHour = new Date(match.start_time).toLocaleTimeString('pt', { hour: '2-digit', minute: '2-digit' });
  const endHour = new Date(match.end_time).toLocaleTimeString('pt', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col gap-4 w-full bg-white rounded-4xl border border-primary-blue shadow-md p-4" {...props}>
      <div className="flex flex-row items-center justify-between text-xl font-bold">
        <p className="font-bold text-md">Campo {match.field}</p>
        <p className="font-bold">{startHour} - {endHour}</p>
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        {team1.map((person, index) => (
          person ? (
            <div className="size-8 rounded-full bg-primary-blue flex items-center justify-center text-white text-xs font-bold">
              {person.user.image ? (
                <img 
                  src={person.user.image}
                  alt={person.user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                person.user.name.charAt(0).toUpperCase()
              )}
            </div>
          ) : (
            <PlusCircle key={index} className="size-10" />
          )
        ))}
        <p className="font-bold text-lg mx-2 text-primary-blue">VS</p>
        {team2.map((person, index) => (
          person ? (
            <div className="size-8 rounded-full bg-primary-blue flex items-center justify-center text-white text-xs font-bold">
              {person.user.image ? (
                <img 
                  src={person.user.image}
                  alt={person.user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                person.user.name.charAt(0).toUpperCase()
              )}
            </div>
          ) : (
            <PlusCircle key={index} className="size-10" />
          )
        ))}
      </div>      
      <div className="flex flex-row items-center justify-between text-xl font-bold">
        <p className="text-lg">{dateString.charAt(0).toUpperCase() + dateString.slice(1)}</p>
        {match.is_private ? (
          <Lock className="size-6 text-red-500" />
        ) : (
          <Globe className="size-6 text-green-500" />
        )}
      </div>
    </div>
  );
}


export {
  MatchCard
};
