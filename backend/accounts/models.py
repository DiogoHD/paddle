from core.models import BaseModel
from django.db import models

class User(BaseModel):
    student_number = models.IntegerField(unique=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    birthday = models.DateField(blank=True, null=True)
    course = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.email
