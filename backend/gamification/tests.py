from django.test import TestCase
from django.utils.timezone import make_aware
from django.contrib.auth import get_user_model

from datetime import datetime

from friends.models import FriendshipRequest
from .models import Achievement, UserAchievement

User = get_user_model()

class AchievementSignalTest(TestCase):
    def setUp(self):
        # Alterar os emails para o domínio permitido
        self.user1 = User.objects.create_user(
            name="diogo", 
            email="diogo@student.uc.pt",  # <--- Domínio correto
            password="123",
            student_number="12345678"
        )
        self.user2 = User.objects.create_user(
            name="nuno", 
            email="nuno@student.uc.pt",   # <--- Domínio correto
            password="123",
            student_number="87654321"
        )

        self.ach = Achievement.objects.create(
            name="Primeira Amizade",
            slug="primeira-amizade",
            requirement_type="friend_count",
            requirement_value=1
        )

    def test_friendship_unlocks_achievement(self):
        # Criar pedido de amizade
        friendship = FriendshipRequest.objects.create(
            from_user=self.user1,
            to_user=self.user2,
            status='pending'
        )

        # Verificar que ainda NÃO têm a conquista
        self.assertFalse(UserAchievement.objects.filter(user=self.user1).exists())

        # Aceitar amizade (Dispara o Signal)
        friendship.status = 'accepted'
        friendship.save()

        # Verificar se a conquista foi atribuída
        self.assertTrue(UserAchievement.objects.filter(user=self.user1, achievement=self.ach).exists())
        self.assertTrue(UserAchievement.objects.filter(user=self.user2, achievement=self.ach).exists())
    
    def test_match_achievement(self):
        # Criar uma conquista de "Joined Match"
        match_achievement = Achievement.objects.create(
            name="Primeira Partida",
            slug="primeira-partida",
            requirement_type="joined_match",
            requirement_value=1
        )

        # Simular o usuário entrando em uma partida (disparando o signal)
        from matches.models import Match, MatchPlayer
        start_time = make_aware(datetime(2024, 1, 1, 10, 0, 0))
        
        match = Match.objects.create(created_by=self.user1, match_type=Match.MatchType.SINGLE, start_time=start_time)
        MatchPlayer.objects.create(user=self.user1, match=match)

        # Verificar se a conquista foi atribuída
        self.assertTrue(UserAchievement.objects.filter(user=self.user1, achievement=match_achievement).exists())