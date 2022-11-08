<?php

namespace App\Services\Token;

class Type
{
    /**
     * Token type
     */
    public const TYPE_FORBIDDEN_PASSWORD = 'forbidden_password';

    /**
     * All available token types
     * @return array
     */
    public static function all(): array
    {
        return [
            self::TYPE_FORBIDDEN_PASSWORD
        ];
    }

    /**
     * Check if type is valid
     * @param string $type
     * @return bool
     */
    public function isValidType(string $type): bool
    {
        return in_array($type, self::all());
    }
}
