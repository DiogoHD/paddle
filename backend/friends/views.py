from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db import models

from accounts.serializers import PublicUserSerializer
from accounts.views import get_user_or_404

from .models import FriendshipRequest
from .serializers import FriendshipRequestSerializer, FriendshipRequestCreateSerializer, FriendshipRequestUpdateSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_friendship_requests(request: Request):
    """Lista de pedidos de amizade pendentes para o utilizador autenticado"""
    user = request.user
    requests = FriendshipRequest.objects.filter(to_user=user, status=FriendshipRequest.Status.PENDING)
    serializer = FriendshipRequestSerializer(requests, many=True)
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_friends(request: Request):
    """Lista de amigos do utilizador autenticado"""
    user = request.user
    friendships = FriendshipRequest.objects.filter(
        (models.Q(from_user=user) | models.Q(to_user=user)) &
        models.Q(status=FriendshipRequest.Status.ACCEPTED)
    )
    friends = [f.to_user if f.from_user == user else f.from_user for f in friendships]
    serializer = PublicUserSerializer(friends, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_friend(request: Request, friend_uuid: str):
    """Remover um amigo da lista de amigos do utilizador autenticado"""
    user = request.user
    friend = get_user_or_404(public_id=friend_uuid)

    friendship = FriendshipRequest.objects.filter(
        (models.Q(from_user=user) & models.Q(to_user=friend)) |
        (models.Q(from_user=friend) & models.Q(to_user=user)),
        status=FriendshipRequest.Status.ACCEPTED
    ).first()

    if not friendship:
        raise NotFound("Amizade não encontrada")
    
    friendship.delete()
    return Response(status=204)