<?php

namespace App\Services\Audit;


use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use App\Repository\AuditEventRepository;
use App\Models\AuditEvent;
use App\Services\Sorting\Sort;
use App\Services\Sorting\PerPage;

class Event
{
    /**
     * @var AuditEventRepository
     */
    private AuditEventRepository $eventRepository;

    /**
     * @param AuditEventRepository $eventRepository
     */
    public function __construct(AuditEventRepository $eventRepository) 
    {
        $this->eventRepository = $eventRepository;
    }

    /**
     * Columns that are sortable
     * @var array
     */
    public const COLUMNS_FOR_SORT = ['user_id', 'event_type', 'created_at', 'ip_address'];

    /**
     * @param string $eventType
     * @param array $fields
     * @return \Modules\Audit\Models\Event
     */
    public function add(?int $entityId, ?string $entityType, string $eventType, array $fields)
    {
        $isActivated = env('ACTIVITY_EVENT_LOGGER_ENABLED', true);

        if ($isActivated) {

            return $this->eventRepository->add(
                Auth::id(),
                $entityId,
                $entityType,
                $eventType,
                $this->prepareData($fields),
                Request::ip(),
                Request::userAgent()
            );

            return null;
        }
    }

    /**
     * Add for specific user
     *
     * @param integer $userId
     * @param integer|null $client_id
     * @param string $moduleCode
     * @param integer|null $entityId
     * @param string|null $model
     * @param string $eventType
     * @param array $fields
     * @return void
     */
    public function addForSpecificUser(int $userId, ?int $entityId, ?string $entityType, string $eventType, array $fields)
    {
        $isActivated = env('ACTIVITY_EVENT_LOGGER_ENABLED', true);

        if ($isActivated) {

            return $this->eventRepository->add(
                $userId,
                $entityId,
                $entityType,
                $eventType,
                $this->prepareData($fields),
                Request::ip(),
                Request::userAgent()
            );

            return null;
        }
    }

    public function prepareData(array $data)
    {
        return [
            'data' => $data
        ];
    }

    /**
     * @param Sort $sort
     * @param PerPage $perPage
     * @return LengthAwarePaginator
     */
    public function getAllPaginated(Sort $sort, PerPage $perPage): LengthAwarePaginator
    {
        $sort->setAdditionalColumns(self::COLUMNS_FOR_SORT);
        $column = $sort->getColumn();
        $direction = $sort->getDirection();
        $perPage = $perPage->getPerPage();

        return $this->eventRepository->getPaginated($perPage, $column, $direction);
    }

    /**
     * Filter all request regarding the audits
     *
     * @param Sort $sort
     * @param array $fields
     * @return LengthAwarePaginator
     */
    public function filterAll(Sort $sort, PerPage $perPage, array $fields): LengthAwarePaginator
    {
        $sort->setAdditionalColumns(self::COLUMNS_FOR_SORT);
        $column = $sort->getColumn();
        $direction = $sort->getDirection();
        $perPage = $perPage->getPerPage();

        return $this->eventRepository->filterAll($perPage, $fields, $column, $direction);
    }

    /**
     * @param string $id
     * @return AuditEvent
     */
    public function details(string $id): AuditEvent
    {
        return $this->eventRepository->getById($id);
    }
}
