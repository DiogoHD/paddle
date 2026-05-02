from core.models import BaseModel
from django.db import models

class Achievement(BaseModel):
    class RequirementType(models.TextChoices):
        FRIEND_COUNT = 'friend_count', 'Friend Count'
        ACCOUNT_AGE = 'account_age', 'Account Age'
        JOINED_MATCH = 'joined_match', 'Joined Match'
    
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    imgSrc = models.URLField(blank=True, null=True)
    
    requirement_type = models.CharField(max_length=50, choices=RequirementType.choices)  # e.g., 'friend_count', 'match_wins'
    requirement_value = models.IntegerField()  # e.g., 10 for 10 friends

    def __str__(self):
        return self.name

class UserAchievement(BaseModel):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'achievement')

    def __str__(self):
        return f"{self.user.username} - {self.achievement.name}"