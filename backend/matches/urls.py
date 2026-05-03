from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_matches, name='list-matches'),
    path('create/', views.create_match, name='create-match'),
    path('<uuid:match_uuid>/', views.get_match_details, name='get-match-details'),
    path('<uuid:match_uuid>/join/', views.join_match, name='join-match'),
    path('<uuid:match_uuid>/leave/', views.leave_match, name='leave-match'),
    path('<uuid:match_uuid>/set-winner/', views.set_winner, name='set-winner'),
    path('me/', views.list_user_matches, name='list-user-matches'),
    path('me/history/', views.user_match_history, name='user-match-history'),
]