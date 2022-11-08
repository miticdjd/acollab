#!/usr/bin/env bash

source ./scripts/databases.sh

docker exec api php artisan migrate:fresh
