from rest_framework import serializers

from .models import Achievement, UserAchievement

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['public_id', 'name', 'description', 'points', 'is_unlocked']
        read_only_fields = fields
    
    def get_is_unlocked(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return UserAchievement.objects.filter(user=user, achievement=obj).exists()
        return False