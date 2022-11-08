#!/usr/bin/env bash

source ./scripts/api/bootstrap.sh

GITHUB_TOKEN=`cat ../../github_access_token.txt`

docker build -f docker/api/Dockerfile . -t "${_DOCKER_TAG_API}"  --build-arg AUTH=${GITHUB_TOKEN}
docker push "${_DOCKER_TAG_API}"

docker build -f docker/web/Dockerfile . -t "${_DOCKER_TAG_WEB}"  --build-arg AUTH=${GITHUB_TOKEN}
docker push "${_DOCKER_TAG_WEB}"
