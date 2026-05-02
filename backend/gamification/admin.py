from django.contrib import admin

from .models import Achievement, UserAchievement

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(UserAchievement)
class UserAchievementAdmin(admin.ModelAdmin):
    list_display = ('user', 'achievement')
    search_fields = ('user__username', 'achievement__name')