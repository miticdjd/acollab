#!/usr/bin/env bash

source ./scripts/api/bootstrap.sh

composer install
./vendor/bin/phpunit tests/
