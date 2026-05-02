from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request

from .models import Achievement
from .serializers import AchievementSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_achievements(request: Request) -> Response:
    "Retrieve all achievements with their unlocked status for the authenticated user."
    achievements = Achievement.objects.all()
    serializer = AchievementSerializer(achievements, many=True, context={'request': request})
    return Response(serializer.data)