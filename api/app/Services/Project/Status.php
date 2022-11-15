<?php

namespace App\Services\Project;

class Status
{
    /**
     * Project status
     */
    public const STATUS_ACTIVE = 'active';
    public const STATUS_PAUSED = 'paused';
    public const STATUS_CLOSED = 'closed';
    public const STATUS_REMOVED = 'removed';

    /**
     * All available project statuses
     * @return array
     */
    public static function all(): array
    {
        return [
            self::STATUS_ACTIVE,
            self::STATUS_PAUSED,
            self::STATUS_CLOSED,
            self::STATUS_REMOVED
        ];
    }
}
