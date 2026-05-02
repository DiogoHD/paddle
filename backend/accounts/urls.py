from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path("me/", views.profile, name="profile"),
    path("me/update/", views.update_profile, name="update-profile"),
    path("me/delete/", views.delete_account, name="delete-account"),
    path("<uuid:public_id>/", views.public_profile, name="public-profile"),
    path("search/", views.filter_users, name="filter-users"),
]