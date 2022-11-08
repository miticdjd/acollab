<?php

namespace App\Services\User;

class Status
{
    /**
     * User status
     */
    public const STATUS_ACTIVE = 'active';
    public const STATUS_DISABLED = 'disabled';
    public const STATUS_REMOVED = 'removed';

    /**
     * All available user statuses
     * @return array
     */
    public static function all(): array
    {
        return [
            self::STATUS_ACTIVE,
            self::STATUS_DISABLED,
            self::STATUS_REMOVED
        ];
    }
}
