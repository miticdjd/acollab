#!/usr/bin/env bash

docker exec api php artisan migrate
docker exec api php artisan cache:clear
docker exec api php artisan users:rebuild:avatars
docker exec api php artisan cache:clear
