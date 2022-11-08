FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    gnupg2

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring exif bcmath fileinfo pcntl sockets zip xml

RUN pecl install -o -f redis \
    &&  rm -rf /tmp/pear \
    &&  docker-php-ext-enable redis

RUN apt-get update && apt-get install -y libpng-dev
RUN apt-get install -y \
    libwebp-dev \
    libjpeg62-turbo-dev \
    libpng-dev libxpm-dev \
    libfreetype6-dev

RUN docker-php-ext-configure gd \
    --with-webp \
    --with-jpeg \
    --with-xpm \
    --with-freetype

RUN docker-php-ext-install gd

# Setup supervisor
RUN apt-get update && apt-get install -y supervisor
COPY docker/supervisord.conf /etc/supervisor/supervisord.conf

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Setup timezone
ENV TZ=Europe/Belgrade
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Set working directory
WORKDIR /var/www

# Setup up
COPY .env.example .env
COPY app app
COPY database database
COPY tests tests
COPY storage storage
COPY bootstrap bootstrap
COPY config config
COPY routes routes
COPY public public
COPY resources resources
COPY artisan artisan
COPY phpunit.xml phpunit.xml
COPY composer.json composer.json
COPY composer.lock composer.lock

# Install composer
RUN composer install -q --no-ansi --no-interaction --no-scripts --no-suggest --no-progress --prefer-dist

# Setup permissions on a storage folder
RUN chmod -R 777 storage
RUN chmod -R 777 bootstrap/cache/

# Setup laravel key
RUN php artisan key:generate

# Setup passport keys
RUN php artisan passport:keys --force

# Setup storage
RUN rm -rf public/storage/*
RUN php artisan storage:link

# Clear cache
RUN php artisan cache:clear

# Copy init script
COPY docker/init.sh /usr/local/bin/start
RUN chmod u+x /usr/local/bin/start

CMD ["/usr/local/bin/start"]
