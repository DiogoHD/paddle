from rest_framework import serializers
from .models import User
from datetime import date


class UserSerializer(serializers.ModelSerializer):
    """Leitura de perfil - Self"""
    class Meta:
        model = User
        fields = [
            'public_id',
            'name',
            'email',
            'student_number',
            'birthday',
            'course',
            'phone_number',
            'created_at',
        ]


class PublicUserSerializer(serializers.ModelSerializer):
    """Leitura de perfil de outro utilizador - info limitada"""
    age = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'public_id',
            'name',
            'course',
            'age',
        ]
    
    def get_age(self, obj):
        if not obj.birthday:
            return None
        today = date.today()
        return today.year - obj.birthday.year - (
            (today.month, today.day) < (obj.birthday.month, obj.birthday.day)
        )

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = [
            'name',
            'email',
            'password',
            'student_number',
            'birthday',
            'course',
            'phone_number',
        ]

    def validate_email(self, value):
        if not value.endswith('uc.pt'):
            raise serializers.ValidationError("Email deve ser do domínio uc.pt")
        return value
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UpdateUserSerializer(serializers.ModelSerializer):
    """Edição de perfil próprio"""
    class Meta:
        model = User
        fields = [
            'name',
            'birthday',
            'course',
            'phone_number',
        ]