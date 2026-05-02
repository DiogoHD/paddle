from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/matches/', include('matches.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('api/friends/', include('friends.urls')),
    path('api/gamification/', include('gamification.urls')),
]
