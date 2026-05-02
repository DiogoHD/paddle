from django.urls import path
from . import views

urlpatterns = [
    path("", views.list_friends, name="list-friends"),
    path("remove/<uuid:friend_uuid>/", views.remove_friend, name="remove-friend"),
    path("requests/", views.list_friendship_requests, name="list-friendship-requests"),
    path("requests/send/", views.send_friendship_request, name="send-friendship-request"),
    path("requests/respond/<uuid:request_uuid>/", views.respond_friendship_request, name="respond-to-friendship-request"),
]