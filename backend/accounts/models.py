import uuid
from django.apps import apps
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email é obrigatório')
        if not email.endswith('uc.pt'):
            raise ValueError('Email deve ser do domínio uc.pt')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    public_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    image = models.ImageField(upload_to='profiles/', blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    course = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name'] 

    def __str__(self):
        return f'{self.name}'
    
    def total_wins(self):
        Match = apps.get_model('matches', 'Match')
        return Match.objects.filter(
            players__user=self,
            winner_team=models.F('players__team')
        ).count()
    
    def total_losses(self):
        Match = apps.get_model('matches', 'Match')
        return Match.objects.filter(
            players__user=self,
            winner_team__isnull=False
        ).exclude(
            winner_team=models.F('players__team')
        ).exclude(
            winner_team__isnull=True
        ).count()