from django.db.models.signals import post_save
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from django.db.models import Q
from django.utils.timezone import now

from .models import UserAchievement, Achievement
from friends.models import FriendshipRequest
from matches.models import MatchPlayer, Match

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
    days_since_joined = (now() - user.created_at).days
    
    potential_achievements = Achievement.objects.filter(
        requirement_type=Achievement.RequirementType.ACCOUNT_AGE,
        requirement_value__lte=days_since_joined
    ).exclude(
        userachievement__user=user  # Exclude already unlocked achievements
    )
    for achievement in potential_achievements:
        UserAchievement.objects.get_or_create(user=user, achievement=achievement)

@receiver(post_save, sender=Match)
def check_wins_achievements(sender, instance, **kwargs):
    if not instance.winner_team:
        return
    
    winning_players = MatchPlayer.objects.filter(match=instance, team=instance.winner_team).select_related('user')
    
    for player in winning_players:
        user = player.user
        
        potential_achievements = Achievement.objects.filter(
            requirement_type=Achievement.RequirementType.WON_COUNT,
            requirement_value__lte=user.total_wins()
        ).exclude(userachievement__user=user)
        
        for achievement in potential_achievements:
            UserAchievement.objects.get_or_create(user=user, achievement=achievement)


@receiver(post_save, sender=Match)
def check_losses_achievements(sender, instance, **kwargs):
    if not instance.winner_team:
        return
    
    losing_players = MatchPlayer.objects.filter(match=instance).exclude(team=instance.winner_team).select_related('user')
    
    for player in losing_players:
        user = player.user
        
        potential_achievements = Achievement.objects.filter(
            requirement_type=Achievement.RequirementType.LOSS_COUNT,
            requirement_value__lte=user.total_losses()
        ).exclude(userachievement__user=user)
        
        for achievement in potential_achievements:
            UserAchievement.objects.get_or_create(user=user, achievement=achievement)