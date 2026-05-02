from rest_framework import serializers

from django.db import models

from accounts.models import User
from .models import FriendshipRequest

class FriendshipRequestSerializer(serializers.ModelSerializer):
    from_user = serializers.ReadOnlyField(source='from_user.public_id')
    to_user = serializers.ReadOnlyField(source='to_user.public_id')
    
    from_user_name = serializers.CharField(source='from_user.name', read_only=True)
    to_user_name = serializers.CharField(source='to_user.name', read_only=True)

    class Meta:
        model = FriendshipRequest
        fields = [
            'public_id', 
            'from_user', 
            'from_user_name', 
            'to_user', 
            'to_user_name', 
            'status', 
            'created_at'
        ]
        read_only_fields = fields

class FriendshipRequestCreateSerializer(serializers.ModelSerializer):
    to_user = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field='public_id'
    )
    
    class Meta:
        model = FriendshipRequest
        fields = ['public_id', 'to_user']
        read_only_fields = ['public_id']
    
    def validate(self, data):
        user = self.context["request"].user
        to_user = data["to_user"]

        if user == to_user:
            raise serializers.ValidationError("Não podes enviar um pedido a ti próprio.")

        # Verifica se já existe QUALQUER pedido entre os dois (pendente ou aceite)
        exists = FriendshipRequest.objects.filter(
            (models.Q(from_user=user) & models.Q(to_user=to_user)) |
            (models.Q(from_user=to_user) & models.Q(to_user=user))
        ).exists()

        if exists:
            raise serializers.ValidationError("Já existe uma amizade ou pedido em curso com este utilizador.")
            
        return data

    def create(self, validated_data):
        return FriendshipRequest.objects.create(
            from_user=self.context["request"].user,
            **validated_data
        )

class FriendshipRequestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendshipRequest
        fields = ['status']

    def validate(self, data):
        user = self.context["request"].user
        if self.instance.to_user != user:
            raise serializers.ValidationError("Só podes responder a pedidos que te foram enviados.")
        
        # Garante que o pedido ainda está pendente antes de mudar
        if self.instance.status != FriendshipRequest.Status.PENDING:
            raise serializers.ValidationError("Este pedido já foi processado.")
        return data