from django.urls import path

from .views import all_achievements

urlpatterns = [
    path('achievements/', all_achievements, name='all_achievements'),
]