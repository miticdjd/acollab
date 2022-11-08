#!/usr/bin/env bash

while getopts v: option
do
    case "${option}"
    in
    v) VERSION=${OPTARG};;
    esac
done

_VERSION=${VERSION:-latest}
_DOCKER_TAG_API="docker.pkg.github.com/miticdjd/acollab/api:${_VERSION}"
_DOCKER_TAG_WEB="docker.pkg.github.com/miticdjd/acollab/web:${_VERSION}"

_SERVICE_NAME_API="api"
_SERVICE_NAME_WEB="web"

_DOCKER_IMAGE_API="docker.pkg.github.com/miticdjd/acollab/api:latest"
_DOCKER_IMAGE_WEB="docker.pkg.github.com/miticdjd/acollab/web:latest"

_HOST="localhost"
_PORT=8000

cd api
