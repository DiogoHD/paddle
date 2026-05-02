import json
from django.core.management.base import BaseCommand
from gamification.models import Achievement

class Command(BaseCommand):
    def handle(self, *args, **options):
        with open('gamification/data/achievements.json', 'r') as f:
            achievements_data = json.load(f)
        
        for ach in achievements_data:
            Achievement.objects.update_or_create(
                slug=ach['slug'],
                defaults={
                    'name': ach['name'],
                    'description': ach['description'],
                    'requirement_type': ach['requirement_type'],
                    'requirement_value': ach['requirement_value'],
                }
            )
        
        self.stdout.write(self.style.SUCCESS('Achievements seeded successfully.'))