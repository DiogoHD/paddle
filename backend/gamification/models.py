from core.models import BaseModel
from django.db import models

class Achievement(BaseModel):
    name = models.CharField(max_length=255)
    description = models.TextField()
    imgSrc = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

class UserAchievement(BaseModel):
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'achievement')

    def __str__(self):
        return f"{self.user.username} - {self.achievement.name}"