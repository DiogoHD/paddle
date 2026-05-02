from django.apps import AppConfig


class GamificationConfig(AppConfig):
    name = 'gamification'
    
    def ready(self):
        # Import signal handlers to ensure they are registered
        import gamification.signals
