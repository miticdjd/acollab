<?php

namespace App\Services\Setting;

class Group
{
    /**
     * Groups
     */
    public const GROUP_GENERAL = 'general';

    /**
     * All available grouprs
     * @return array
     */
    public static function all(): array
    {
        return [
            self::GROUP_GENERAL
        ];
    }

    /**
     * Check if group is valid
     * @param string $type
     * @return bool
     */
    public function isValidGroup(string $type): bool
    {
        return in_array($type, self::all());
    }
}
