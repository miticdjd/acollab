#!/usr/bin/env bash

while getopts v: option
do
    case "${option}"
    in
    v) VERSION=${OPTARG};;
    esac
done

_VERSION=${VERSION:-latest}
_DOCKER_TAG_APP="docker.pkg.github.com/miticdjd/acollab/app:${_VERSION}"

_SERVICE_NAME_APP="app"

_DOCKER_IMAGE_APP="docker.pkg.github.com/miticdjd/acollab/app"

_HOST="localhost"
_PORT=3000

cd app
