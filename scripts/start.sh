#!/usr/bin/env bash

docker compose pull
docker compose up --detach --force-recreate
