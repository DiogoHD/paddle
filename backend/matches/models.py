from datetime import timedelta

from django.utils import timezone
from django.db import models
from core.models import BaseModel
from django.core.exceptions import ValidationError

class TeamChoices(models.TextChoices):
    A = "A", "Team A"
    B = "B", "Team B"

class Match(BaseModel):

    class Field(models.IntegerChoices):
        COURT_1 = 1, "Court 1"
        COURT_2 = 2, "Court 2"
        COURT_3 = 3, "Court 3"
        COURT_4 = 4, "Court 4"
        COURT_5 = 5, "Court 5"

    class MatchType(models.TextChoices):
        SINGLE = "SINGLE", "Single"
        TEAM = "TEAM", "Team"

    created_by = models.ForeignKey('accounts.User', related_name="matches_created", on_delete=models.CASCADE)
    match_type = models.CharField(max_length=10, choices=MatchType.choices)
    field = models.SmallIntegerField(choices=Field.choices, blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)
    is_private = models.BooleanField(default=False)
    winner_team = models.CharField(max_length=1, choices=TeamChoices.choices, blank=True, null=True)
    
    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Match"
        verbose_name_plural = "Matches"

    def clean(self):
        if self.end_time and self.end_time <= self.start_time:
            raise ValidationError("End time must be after start time")
        if self.start_time < timezone.now():
            raise ValidationError("Start time cannot be in the past")

    def save(self, *args, **kwargs):
        if not self.end_time:
            self.end_time = self.start_time + timedelta(hours=1, minutes=30)
        
        if self.field is None:
            occupied_fields = Match.objects.filter(
                start_time__lt=self.end_time,
                end_time__gt=self.start_time
            ).values_list('field', flat=True)
            available_fields = set(c[0] for c in self.Field.choices) - set(occupied_fields)
            if available_fields:
                self.field = min(available_fields)
        
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.match_type} match created by {self.created_by} on field {self.field}"

class MatchPlayer(BaseModel):
    match = models.ForeignKey(Match, related_name="players", on_delete=models.CASCADE)
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)

    team = models.CharField(
        max_length=1,
        choices=TeamChoices.choices,
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = "Match Player"
        verbose_name_plural = "Match Players"
        constraints = [
            models.UniqueConstraint(fields=['match', 'user'], name='unique_player_per_match')
        ]

    def clean(self):
        if not self.match_id:
            return
        
        players = MatchPlayer.objects.filter(match=self.match)
        
        if self.match.match_type == Match.MatchType.SINGLE and players.count() >= 2:
            raise ValidationError("Single match can only have 2 players")

        if self.match.match_type == Match.MatchType.TEAM:
            if players.count() >= 4:
                raise ValidationError("Team match can only have 4 players")
            if self.team and players.filter(team=self.team).count() >= 2:
                raise ValidationError(f"Team {self.team} can only have 2 players")
    
    def __str__(self):
        return f"{self.user} - {self.team}"