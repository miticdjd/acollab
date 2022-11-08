<?php

namespace App\Repository;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use App\Models\AuditEvent;
use Carbon\Carbon;
use Illuminate\Support\Str;

class AuditEventRepository
{
    /**
     * Get events paginated
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getPaginated(int $perPage, string $column, string $direction): LengthAwarePaginator
    {
        return AuditEvent::orderBy($column, $direction)->paginate($perPage);
    }

    /**
     * Filter all queries
     *
     * @param integer $perPage
     * @param array $fields
     * @param string $column
     * @param string $direction
     * @return LengthAwarePaginator
     */
    public function filterAll(int $perPage, array $fields, string $column, string $direction): LengthAwarePaginator
    {
        $query = AuditEvent::query();

        if (array_key_exists('user_id', $fields) && is_array($fields['user_id'])) {
            $query->whereIn('user_id', $fields['user_id']);
        }

        if (array_key_exists('event_type', $fields) && is_array($fields['event_type'])) {
            $query->whereIn('event_type', $fields['event_type']);
        }

        if (array_key_exists('ip_address', $fields) && !empty($fields['ip_address'])) {
            $query->where('ip_address', 'LIKE', '%' . $fields['ip_address'] . '%');
        }

        if (array_key_exists('created_at', $fields)) {
            $start = new Carbon($fields['created_at']['start'] . '00:00:00');
            $end = new Carbon($fields['created_at']['end'] . '23:59:59');

            $query->whereBetween('created_at', [$start, $end]);
        }

        return $query->orderBy($column, $direction)->paginate($perPage);
    }

    /**
     * Get details of an event
     * @param string $id
     * @return AuditEvent|Model
     */
    public function getById(string $id): ?AuditEvent
    {
        return AuditEvent::where('id', $id)->first();
    }

    /**
     * @param int|null $clientId
     * @param int|null $userId
     * @param string $moduleCode
     * @param string $eventType
     * @param array $fields
     * @param $ipAddress
     * @return AuditEvent
     */
    public function add(?int $userId, ?int $entityId, ?string $entityType, string $eventType, array $fields, string $ipAddress, string $userAgent): AuditEvent
    {
        $event = new AuditEvent();
        $event->id = Str::uuid()->toString();
        $event->fill($fields);
        $event->entity_id = $entityId;
        $event->entity_type = $entityType;
        $event->user_id = $userId;
        $event->event_type = $eventType;
        $event->ip_address = $ipAddress;
        $event->user_agent = $userAgent;
        $event->save();

        return $event->refresh();
    }
}
