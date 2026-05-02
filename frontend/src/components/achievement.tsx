
type AchievementCardProps = {
  name: string,
  description: string,
  img_src: string,
  is_unlocked: boolean
}

export function AchievementCard({
  achievement
}: {
  achievement: AchievementCardProps
}) {
    return (
        <div className={`flex flex-row w-full items-center gap-4 bg-white rounded-4xl border ${achievement.is_unlocked ? 'border-primary-blue' : 'border-gray-300'} shadow-md p-4`}>
            <img
                src={achievement.img_src}
                alt={achievement.name}
                className={`size-16 ${achievement.is_unlocked ? '' : 'grayscale'}`}
            />
            <div className="flex flex-col gap-1 items-start">
                <h3 className={`text-lg font-bold ${achievement.is_unlocked ? 'text-primary-blue' : 'text-gray-500'}`}>
                    {achievement.name}
                </h3>
                <p className={`text-center ${achievement.is_unlocked ? '' : 'text-gray-400'}`}>
                    {achievement.description}
                </p>
            </div>
        </div>
    );
}
