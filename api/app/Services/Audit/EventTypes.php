<?php

namespace App\Services\Audit;

class EventTypes
{
    /** Event types */


    public const USER_LOGIN = 'user_login';
    public const USER_LOGOUT = 'user_logout';

    public const ENTITY_CREATED = 'entity_created';
    public const ENTITY_UPDATED = 'entity_updated';
    public const ENTITY_DELETED = 'entity_deleted';

    public const FILE_DOWNLOADED = 'file_downloaded';

    /**
     * Get all events
     */
    public function getAllEvents(): array
    {
        return [
            self::USER_LOGIN,
            self::USER_LOGOUT,
            self::ENTITY_CREATED,
            self::ENTITY_UPDATED,
            self::ENTITY_DELETED,
            self::FILE_DOWNLOADED
        ];
    }
}
