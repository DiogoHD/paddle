from django.contrib import admin

from matches.models import SingleMatch, TeamMatch

# Register your models here.
admin.site.register(SingleMatch)
admin.site.register(TeamMatch)