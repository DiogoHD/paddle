from django.db.models.signals import post_save
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from django.db.models import Q
from django.utils.timezone import now

from .models import UserAchievement, Achievement
from friends.models import FriendshipRequest
from matches.models import MatchPlayer

@receiver(post_save, sender=FriendshipRequest)
def check_friendship_achievements(sender, instance, **kwargs):
    if instance.status == 'accepted':
        users_to_check = [instance.from_user, instance.to_user]
        
        for user in users_to_check:
            # Count accepted friendships
            friend_count = FriendshipRequest.objects.filter(
                (Q(from_user=user) | Q(to_user=user)) & Q(status='accepted')
            ).distinct().count()
            
            potential_achievements = Achievement.objects.filter(
                requirement_type=Achievement.RequirementType.FRIEND_COUNT, 
                requirement_value__lte=friend_count
            ).exclude(
                userachievement__user=user  # Exclude already unlocked achievements
            )
            for achievement in potential_achievements:
                UserAchievement.objects.get_or_create(user=user, achievement=achievement)

@receiver(user_logged_in)
def check_account_age_achievements(sender, request, user, **kwargs):
    days_since_joined = (now() - user.date_joined).days
    
    potential_achievements = Achievement.objects.filter(
        requirement_type=Achievement.RequirementType.ACCOUNT_AGE,
        requirement_value__lte=days_since_joined
    ).exclude(
        userachievement__user=user  # Exclude already unlocked achievements
    )
    for achievement in potential_achievements:
        UserAchievement.objects.get_or_create(user=user, achievement=achievement)

@receiver(post_save, sender=MatchPlayer)
def check_joined_match_achievements(sender, instance, created, **kwargs):
    if not created:
        return  # Only check when a new MatchPlayer is created (i.e., user joins a match)
    user = instance.user
    
    # Count matches joined by the user
    joined_match_count = MatchPlayer.objects.filter(user=user).count()

    potential_achievements = Achievement.objects.filter(
        requirement_type=Achievement.RequirementType.JOINED_MATCH,
        requirement_value__lte=joined_match_count
    ).exclude(
        userachievement__user=user  # Exclude already unlocked achievements
    )
    for achievement in potential_achievements:
        UserAchievement.objects.get_or_create(user=user, achievement=achievement)