<?php

namespace App\Services\Issue;

class Status
{
    /**
     * Issue status
     */
    public const STATUS_OPEN = 'open';
    public const STATUS_IN_PROGRESS = 'in_progress';
    public const STATUS_QA_READY = 'qa_ready';
    public const STATUS_DONE = 'done';
    public const STATUS_REMOVED = 'removed';

    /**
     * All available issue statuses
     * @return array
     */
    public static function all(): array
    {
        return [
            self::STATUS_OPEN,
            self::STATUS_IN_PROGRESS,
            self::STATUS_QA_READY,
            self::STATUS_DONE,
            self::STATUS_REMOVED
        ];
    }
}
