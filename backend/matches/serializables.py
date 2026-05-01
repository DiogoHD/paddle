from rest_framework import serializers
from .models import SingleMatch, TeamMatch

class SingleMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = SingleMatch
        fields = '__all__'

class TeamMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMatch
        fields = '__all__'