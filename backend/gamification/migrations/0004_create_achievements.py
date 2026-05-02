from django.db import migrations
import json
from pathlib import Path

def create_achievements(apps, schema_editor):
    Achievement = apps.get_model('gamification', 'Achievement')
    file_path = Path(__file__).resolve().parent.parent / 'data' / 'achievements.json'
    
    with open(file_path, 'r') as f:
        achievements_data = json.load(f)
    
    for ach in achievements_data:
        Achievement.objects.get_or_create(
            name=ach['name'],
            slug=ach['slug'],
            description=ach['description'],
            requirement_type=ach['requirement_type'],
            requirement_value=ach['requirement_value']
        )

class Migration(migrations.Migration):
    
    dependencies = [
        ('gamification', '0003_achievement_requirement_type_and_more'),
    ]

    operations = [
        migrations.RunPython(create_achievements),
    ]