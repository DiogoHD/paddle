from django.contrib import admin

from matches.models import Match, MatchPlayer

# Register your models here.
@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ("created_by", "match_type", "field", "start_time", "end_time", "is_private")
    list_filter = ("match_type", "field", "is_private")
    search_fields = ("created_by__name",)
    ordering = ("-created_at",)

@admin.register(MatchPlayer)
class MatchPlayerAdmin(admin.ModelAdmin):
    list_display = ("user", "match", "team")