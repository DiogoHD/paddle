from django.urls import path
from . import views

urlpatterns = [
    path("", views.list_friendships, name="list-friendships"),
    path("<uuid:friendship_uuid>/remove/", views.remove_friend, name="remove-friend"),
    path("requests/send/", views.send_friendship_request, name="send-friendship-request"),
    path("requests/<uuid:request_uuid>/respond/", views.respond_friendship_request, name="respond-to-friendship-request"),
]