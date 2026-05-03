#!/bin/sh
set -e

echo "Waiting for postgres..."
while ! nc -z db 5432; do
  sleep 0.5
done
echo "PostgreSQL ready!"

python manage.py migrate
python manage.py seed_achievements
python manage.py collectstatic --noinput

exec "$@"