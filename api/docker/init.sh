#!/usr/bin/env bash

set -e

role=${CONTAINER_ROLE:-app}
env=${APP_ENV:-local}

if [ "$role" = "worker" ]; then

    exec /usr/bin/supervisord

elif [ "$role" = "cron" ]; then

    exec cron -f

else

    exec php-fpm -F -R

fi
