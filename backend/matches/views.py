from django.utils import timezone
from rest_framework.exceptions import PermissionDenied, NotFound, ValidationError
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from .models import Match, MatchPlayer
from .serializers import MatchSerializer, MatchCreateSerializer, MatchPlayerSerializer

def get_match_or_404(match_uuid: str) -> Match:
    try:
        return Match.objects.get(public_id=match_uuid)
    except Match.DoesNotExist:
        raise NotFound("Match not found")

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_matches(request: Request) -> Response:
    matches = Match.objects.filter(end_time__gt=timezone.now())
    serializer = MatchSerializer(matches, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_match_history(request: Request) -> Response:
    matches = Match.objects.filter(end_time__lte=timezone.now(), players__user=request.user)
    serializer = MatchSerializer(matches, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_match(request: Request) -> Response:
    serializer = MatchCreateSerializer(data=request.data, context={"request": request})
    serializer.is_valid(raise_exception=True)
    match = serializer.save()
    return Response(MatchSerializer(match, context={"request": request}).data, status=201)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def join_match(request: Request, match_uuid: str) -> Response:
    match = get_match_or_404(match_uuid)
    from friends.models import Friendship
    if match.is_private:
        is_friend = Friendship.objects.filter(
            (Q(from_user=request.user) & Q(to_user=match.created_by)) |
            (Q(from_user=match.created_by) & Q(to_user=request.user)),
            status=Friendship.Status.ACCEPTED
        ).exists()
        if not is_friend:
            raise PermissionDenied("Não tem permissão para entrar nesta partida privada")
    if match.players.filter(user=request.user).exists():
        return Response({"detail": "Já está inscrito nesta partida"}, status=400)

    team = MatchPlayer.Team.A if match.players.filter(team=MatchPlayer.Team.A).count() < 2 else MatchPlayer.Team.B
    player = MatchPlayer(match=match, user=request.user, team=team)
    try:
        player.full_clean()
        player.save()
    except ValidationError as e:
        return Response({"detail": e.messages}, status=400)
    return Response(MatchPlayerSerializer(player, context={"request": request}).data, status=201)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def leave_match(request: Request, match_uuid: str) -> Response:
    match = get_match_or_404(match_uuid)
    player = MatchPlayer.objects.filter(match=match, user=request.user).first()
    if not player:
        return Response({"detail": "Não faz parte desta partida"}, status=400)
    player.delete()
    
    # If the match is now empty, delete it
    remaining_players = MatchPlayer.objects.filter(match=match)
    if not remaining_players.exists():
        match.delete()
    # If the match creator left, assign a new creator
    elif match.created_by == request.user:
        match.created_by = remaining_players.first().user
        match.save()
    return Response(status=204)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_match_details(request: Request, match_uuid: str) -> Response:
    match = get_match_or_404(match_uuid)
    serializer = MatchSerializer(match, context={"request": request})
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_user_matches(request: Request) -> Response:
    matches = Match.objects.filter(players__user=request.user, end_time__gt=timezone.now())
    serializer = MatchSerializer(matches, many=True, context={"request": request})
    return Response(serializer.data)