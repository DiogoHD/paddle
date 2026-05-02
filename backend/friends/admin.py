from django.contrib import admin

from friends.models import FriendshipRequest

# Register your models here.
@admin.register(FriendshipRequest)
class FriendshipRequestAdmin(admin.ModelAdmin):
    list_display = ('from_user', 'to_user', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('from_user__name', 'to_user__name')