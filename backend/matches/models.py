from django.db import models
from accounts.models import User
from core.models import BaseModel

class Match(BaseModel):
    created_by = models.ForeignKey(User, related_name='matches_created', on_delete=models.CASCADE)
    field = models.SmallIntegerField(blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)
    is_team_match = models.BooleanField(default=False)
    is_private = models.BooleanField(default=False)

class SingleMatch(Match):
    player1 = models.ForeignKey(User, related_name='matches_as_user1', on_delete=models.CASCADE)
    player2 = models.ForeignKey(User, related_name='matches_as_user2', on_delete=models.CASCADE)

    def __str__(self):
        return f'Match between {self.player1.name} and {self.player2.name}'

class TeamMatch(Match):
    team1_player1 = models.ForeignKey(User, related_name='team_matches_as_team1_player1', on_delete=models.CASCADE)
    team1_player2 = models.ForeignKey(User, related_name='team_matches_as_team1_player2', on_delete=models.CASCADE)
    team2_player1 = models.ForeignKey(User, related_name='team_matches_as_team2_player1', on_delete=models.CASCADE)
    team2_player2 = models.ForeignKey(User, related_name='team_matches_as_team2_player2', on_delete=models.CASCADE)

    def __str__(self):
        return f'Match between Team 1 ({self.team1_player1.email}, {self.team1_player2.email}) and Team 2 ({self.team2_player1.email}, {self.team2_player2.email})'