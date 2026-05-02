from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db import models

from .models import FriendshipRequest
from .serializers import FriendshipRequestSerializer, FriendshipRequestCreateSerializer, FriendshipRequestUpdateSerializer

def get_friendship_request_or_404(request_uuid):
    try:
        return FriendshipRequest.objects.get(public_id=request_uuid)
    except FriendshipRequest.DoesNotExist:
        raise NotFound("Pedido de amizade não encontrado")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_friendships(request: Request):
    user = request.user
    friendships = FriendshipRequest.objects.filter(
        (models.Q(from_user=user) | models.Q(to_user=user)) &
        ~models.Q(status=FriendshipRequest.Status.REJECTED)  # Excluir pedidos recusados
    )
    serializer = FriendshipRequestSerializer(friendships, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_friendship_request(request: Request):
    """Envia um pedido de amizade para outro utilizador"""
    serializer = FriendshipRequestCreateSerializer(data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    friendship_request = serializer.save()
    return Response(FriendshipRequestSerializer(friendship_request).data, status=201)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def respond_friendship_request(request: Request, request_uuid: str):
    """Aceitar ou rejeitar um pedido de amizade recebido"""
    try:
        friendship_request = FriendshipRequest.objects.get(public_id=request_uuid)
    except FriendshipRequest.DoesNotExist:
        raise NotFound("Pedido de amizade não encontrado")
    
    serializer = FriendshipRequestUpdateSerializer(friendship_request, data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    updated_request = serializer.save()
    return Response(FriendshipRequestSerializer(updated_request).data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_friend(request: Request, friendship_uuid: str):
    """Remover um amigo da lista de amigos do utilizador autenticado"""
    friendship = get_friendship_request_or_404(friendship_uuid)
    friendship.delete()
    return Response(status=204)