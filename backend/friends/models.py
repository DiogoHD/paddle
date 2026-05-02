from core.models import BaseModel
from django.db import models
from django.core.exceptions import ValidationError


class FriendshipRequest(BaseModel):
    
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending'
        ACCEPTED = 'accepted', 'Accepted'
        REJECTED = 'rejected', 'Rejected'
    
    from_user = models.ForeignKey('accounts.User', related_name='friendships_initiated', on_delete=models.CASCADE)
    to_user = models.ForeignKey('accounts.User', related_name='friendships_received', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['from_user', 'to_user'], name='unique_friendship_request'),
            models.CheckConstraint(condition=~models.Q(from_user=models.F('to_user')), name='prevent_self_friendship'),
        ]
    
    def clean(self):
        if self.from_user == self.to_user:
            raise ValidationError("Não podes enviar um pedido de amizade para ti mesmo.")
    
    def __str__(self):
        return f"{self.from_user} -> {self.to_user} ({self.status})"