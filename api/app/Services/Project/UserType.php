<?php

namespace App\Services\Project;

class UserType
{
    /**
     * Project user types
     */
    public const TYPE_MANAGER = 'manager';
    public const TYPE_DEVELOPER = 'developer';

    /**
     * All available project user types
     * @return array
     */
    public static function all(): array
    {
        return [
            self::TYPE_MANAGER,
            self::TYPE_DEVELOPER,
        ];
    }
}
