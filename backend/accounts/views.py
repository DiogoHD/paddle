from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import User
from .serializers import UserSerializer, PublicUserSerializer, RegisterSerializer, UpdateUserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request: Request):
    """Perfil do utilizador autenticado"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def public_profile(request: Request, public_id: str):
    """Perfil de outro utilizador - info limitada"""
    try:
        user = User.objects.get(public_id=public_id)
    except User.DoesNotExist:
        raise NotFound("User not found")
    
    serializer = PublicUserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def register(request: Request):
    """Registo de novo utilizador"""
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response(UserSerializer(user).data, status=201)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request: Request):
    """Atualização do perfil do utilizador autenticado"""
    serializer = UpdateUserSerializer(request.user, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response(UserSerializer(user).data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request: Request):
    """Eliminação da conta do utilizador autenticado"""
    user = request.user
    user.delete()
    return Response(status=204)