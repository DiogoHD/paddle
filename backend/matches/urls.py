from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_matches, name='list-matches'),
    path('create/', views.create_match, name='create-match'),
    path('<uuid:match_uuid>/', views.get_match_details, name='get-match-details'),
    path('<uuid:match_uuid>/join/', views.join_match, name='join-match'),
    path('<uuid:match_uuid>/leave/', views.leave_match, name='leave-match'),
    path('user/<uuid:user_uuid>/', views.list_user_matches, name='list-user-matches'),
    path('user/<uuid:user_uuid>/history/', views.user_match_history, name='user-match-history'),
]