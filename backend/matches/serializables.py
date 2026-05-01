
from rest_framework import serializers
from .models import Match, MatchPlayer


class MatchPlayerSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = MatchPlayer
        fields = ['id', 'user', 'user_name', 'team']
        read_only_fields = ['id', 'user', 'user_name']

class MatchSerializer(serializers.ModelSerializer):
    players = MatchPlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Match
        fields = [
            "id",
            "created_by",
            "match_type",
            "field",
            "start_time",
            "end_time",
            "is_private",
            "players",
        ]
        read_only_fields = ["id", "field", "created_by", "end_time", "players"]

class MatchCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Match
        fields = [
            "id",
            "match_type",
            "start_time",
            "end_time",
            "is_private",
        ]
        read_only_fields = ["id", "end_time"]
    
    def create(self, validated_data):
        user = self.context["request"].user

        match = Match.objects.create(
            created_by=user,
            **validated_data
        )
        match.full_clean()
        match.save()

        return match