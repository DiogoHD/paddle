from rest_framework import serializers

from .models import Achievement, UserAchievement

class AchievementSerializer(serializers.ModelSerializer):
    is_unlocked = serializers.SerializerMethodField()
    
    class Meta:
        model = Achievement
        fields = ['public_id', 'name', 'slug', 'description', 'img_src', 'is_unlocked']
        read_only_fields = fields
    
    def get_is_unlocked(self, obj):
        user = self.context.get('request').user
        if user and user.is_authenticated:
            return UserAchievement.objects.filter(user=user, achievement=obj).exists()
        return False