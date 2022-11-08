#!/usr/bin/env bash

source ./scripts/bootstrap.sh

# Create required databases
docker exec mysql mysql -u root -p${_MYSQL_ROOT_PASSWORD} -e "CREATE DATABASE IF NOT EXISTS acollab"

# Grant all privilegies to a slickdine user
docker exec mysql mysql -u root -p${_MYSQL_ROOT_PASSWORD} -e "GRANT ALL ON *.* TO 'acollab'@'%'"
