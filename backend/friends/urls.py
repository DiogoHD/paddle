from django.urls import path
from . import views

urlpatterns = [
    path("", views.list_friendships, name="list-friendships"),
    path("remove/<uuid:friend_uuid>/", views.remove_friend, name="remove-friend"),
    path("requests/send/", views.send_friendship_request, name="send-friendship-request"),
    path("requests/respond/<uuid:request_uuid>/", views.respond_friendship_request, name="respond-to-friendship-request"),
]