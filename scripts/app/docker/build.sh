#!/usr/bin/env bash

source ./scripts/app/bootstrap.sh

GITLAB_TOKEN=`cat ../../gitlab_access_token.txt`

docker build -f Dockerfile . -t "${_DOCKER_TAG_APP}"  --build-arg AUTH=${GITLAB_TOKEN}
docker push "${_DOCKER_TAG_APP}"
