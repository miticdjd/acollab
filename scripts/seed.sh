#!/usr/bin/env bash

# Reset storage data and cache
docker exec -t api sh -c "rm -rf /var/www/storage/app/*"
docker exec -t api sh -c "cd storage && mkdir -p logs && mkdir -p framework && mkdir -p framework/cache && mkdir -p framework/cache/data"
docker exec -t api sh -c "cd storage && mkdir -p framework/sessions && mkdir -p framework/testing && mkdir -p framework/views"
docker exec -t api sh -c "cd storage && chmod -R 777 ../storage && chmod -R 777 ../storage"

source ./scripts/migrate-fresh.sh

docker exec api composer dump-autoload
docker exec api php artisan db:seed
docker exec api php artisan key:generate
docker exec api php artisan passport:keys --force
docker exec api php artisan passport:client:default

# Change file permissions
docker exec -t api sh -c "cd storage && chmod -R 777 ../storage && chmod -R 777 ../storage"

docker exec api php artisan cache:clear
