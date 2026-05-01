COMPOSE=docker compose

.PHONY: help up down rebuild makemigrations migrate logs

help:
	@echo "Available commands:"
	@echo "  up              Start the application"
	@echo "  down            Stop the application"
	@echo "  rebuild         Rebuild the application"
	@echo "  makemigrations  Create new migrations based on the changes detected to your models"
	@echo "  migrate         Apply database migrations"
	@echo "  logs            View logs"

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

rebuild:
	$(COMPOSE) up -d --build

makemigrations:
	$(COMPOSE) exec backend python manage.py makemigrations

migrate:
	$(COMPOSE) exec backend python manage.py migrate

logs:
	$(COMPOSE) logs