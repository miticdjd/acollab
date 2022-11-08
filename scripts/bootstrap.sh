#!/usr/bin/env bash

while getopts m: option
do
    case "${option}"
    in
    m) MYSQL_ROOT_PASSWORD=${OPTARG};;
    esac
done

_MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-Root1234}

cd api/
