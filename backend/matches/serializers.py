
from rest_framework import serializers

from accounts.serializers import PublicUserSerializer
from .models import Match, MatchPlayer


class MatchPlayerSerializer(serializers.ModelSerializer):
    user = PublicUserSerializer(read_only=True)

    class Meta:
        model = MatchPlayer
        fields = ['public_id', 'user', 'team']
        read_only_fields = ['public_id', 'user']

class MatchSerializer(serializers.ModelSerializer):
    created_by = PublicUserSerializer(read_only=True)
    players = MatchPlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Match
        fields = [
            "public_id",
            "created_by",
            "match_type",
            "field",
            "start_time",
            "end_time",
            "is_private",
            "winner_team",
            "players",
        ]
        read_only_fields = ["public_id", "field", "created_by", "end_time", "players"]

class MatchCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Match
        fields = [
            "public_id",
            "match_type",
            "start_time",
            "end_time",
            "is_private",
        ]
        read_only_fields = ["public_id", "end_time"]
    
    def create(self, validated_data):
        user = self.context["request"].user

        match = Match.objects.create(
            created_by=user,
            **validated_data
        )
        match.full_clean()
        match.save()
        
        team = MatchPlayer.Team.A
        player = MatchPlayer(match=match, user=user, team=team)
        player.full_clean()
        player.save()

        return match